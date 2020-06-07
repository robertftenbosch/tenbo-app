import SwaggerClient from 'swagger-client';
import authService from "../components/api-authorization/AuthorizeService";
function TenboApiService() {
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

async function GoalApi(){
    const service = await TenboApiService();
    return service.Goal;
}

async function WeatherForecastApi(){
    const service = await TenboApiService();
    return service.WeatherForecast;
}
async function ObjectiveApi(){
    const service = await TenboApiService();
    return service.Objective;
}
async function TagApi(){
    const service = await TenboApiService();
    return service.Tag;
}

async function TenboActionApi(){
    const service = await TenboApiService();
    return service.TenboAction;
}
async function TenboInfoApi(){
    const service = await TenboApiService();
    return service.TenboInfo;
}




export {GoalApi, WeatherForecastApi,ObjectiveApi,TagApi,TenboActionApi,TenboInfoApi}