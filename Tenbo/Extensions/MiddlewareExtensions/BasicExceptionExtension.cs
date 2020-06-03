using System;
using System.Net;
using System.Text.Json;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;

namespace Tenbo.Extensions.MiddlewareExtensions
{
    public static class BasicExceptionExtension
    {
        public static void ConfigureExceptionHandler(this IApplicationBuilder app, ILogger logger)
        {
            app.UseExceptionHandler(appError =>
            {
                appError.Run(async context =>
                {
                    context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
                    context.Response.ContentType = "application/json";

                    var contextFeature = context.Features.Get<IExceptionHandlerFeature>();
                    var traceId = context.TraceIdentifier;
                    if (contextFeature != null)
                    {
                        var errorId = Guid.NewGuid();

                        logger.LogError($"\nErrorId = {errorId.ToString()} \nTraceId = {traceId} \n{contextFeature.Error}");

                        await context.Response.WriteAsync(
                            new ErrorDetailDto()
                            {
                                StatusCode = context.Response.StatusCode,
                                Message = $"Internal Server Error. errorId={errorId.ToString()}"
                            }.toJson());
                    }
                });
            });
        }
    }

    public class ErrorDetailDto
    {
        public int StatusCode { get; set; }
        public string Message { get; set; }

        public string toJson()
        {
            return JsonSerializer.Serialize(this);
        }
    }

}