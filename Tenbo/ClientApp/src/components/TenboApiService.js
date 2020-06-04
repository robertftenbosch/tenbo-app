import SwaggerClient from 'swagger-client';
import authService from "./api-authorization/AuthorizeService";

export default function TenboApiService() {
    const specUrl = window.location.origin + "/swagger/v1/swagger.json";
    
     async function createClient() {
        const token = await authService.getAccessToken();
        return new SwaggerClient({
            url: specUrl,
            requestInterceptor(req) {
                req.headers['content-type'] = 'application/json';
                req.headers['Authorization'] = `Bearer ${token}`;
                return req
            }
        })
    }
    return createClient().then(function (client) {
        return client.apis;
    })
}