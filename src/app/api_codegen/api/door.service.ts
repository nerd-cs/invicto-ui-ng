/**
 * Invicto API
 * REST API Documentation
 *
 * OpenAPI spec version: 1.0
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 *//* tslint:disable:no-unused-variable member-ordering */

import { Inject, Injectable, Optional }                      from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams,
         HttpResponse, HttpEvent }                           from '@angular/common/http';
import { CustomHttpUrlEncodingCodec }                        from '../encoder';

import { Observable }                                        from 'rxjs';

import { Door } from '../model/door';
import { DoorInfo } from '../model/doorInfo';
import { DoorPage } from '../model/doorPage';
import { UpdateDoorDto } from '../model/updateDoorDto';

import { BASE_PATH, COLLECTION_FORMATS }                     from '../variables';
import { Configuration }                                     from '../configuration';


@Injectable()
export class DoorService {

    protected basePath = '/';
    public defaultHeaders = new HttpHeaders();
    public configuration = new Configuration();

    constructor(protected httpClient: HttpClient, @Optional()@Inject(BASE_PATH) basePath: string, @Optional() configuration: Configuration) {
        if (basePath) {
            this.basePath = basePath;
        }
        if (configuration) {
            this.configuration = configuration;
            this.basePath = basePath || configuration.basePath || this.basePath;
        }
    }

    /**
     * @param consumes string[] mime-types
     * @return true: consumes contains 'multipart/form-data', false: otherwise
     */
    private canConsumeForm(consumes: string[]): boolean {
        const form = 'multipart/form-data';
        for (const consume of consumes) {
            if (form === consume) {
                return true;
            }
        }
        return false;
    }


    /**
     * Get all doors for specified location
     * 
     * @param locationId 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public doorControllerGetAllForLocation(locationId: number, observe?: 'body', reportProgress?: boolean): Observable<Array<Door>>;
    public doorControllerGetAllForLocation(locationId: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<Door>>>;
    public doorControllerGetAllForLocation(locationId: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<Door>>>;
    public doorControllerGetAllForLocation(locationId: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (locationId === null || locationId === undefined) {
            throw new Error('Required parameter locationId was null or undefined when calling doorControllerGetAllForLocation.');
        }

        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (locationId !== undefined && locationId !== null) {
            queryParameters = queryParameters.set('locationId', <any>locationId);
        }

        let headers = this.defaultHeaders;

        // authentication (cookie) required
        if (this.configuration.apiKeys && this.configuration.apiKeys["connect.sid"]) {
            queryParameters = queryParameters.set('connect.sid', this.configuration.apiKeys["connect.sid"]);
        }

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.request<Array<Door>>('get',`${this.basePath}/door`,
            {
                params: queryParameters,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Get info about selected door
     * 
     * @param doorId 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public doorControllerGetDoorInfo(doorId: number, observe?: 'body', reportProgress?: boolean): Observable<DoorInfo>;
    public doorControllerGetDoorInfo(doorId: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<DoorInfo>>;
    public doorControllerGetDoorInfo(doorId: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<DoorInfo>>;
    public doorControllerGetDoorInfo(doorId: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (doorId === null || doorId === undefined) {
            throw new Error('Required parameter doorId was null or undefined when calling doorControllerGetDoorInfo.');
        }

        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});

        let headers = this.defaultHeaders;

        // authentication (cookie) required
        if (this.configuration.apiKeys && this.configuration.apiKeys["connect.sid"]) {
            queryParameters = queryParameters.set('connect.sid', this.configuration.apiKeys["connect.sid"]);
        }

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.request<DoorInfo>('get',`${this.basePath}/door/${encodeURIComponent(String(doorId))}`,
            {
                params: queryParameters,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Get list of doors with pagination
     * 
     * @param page 
     * @param limit 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public doorControllerGetDoorsPage(page?: number, limit?: number, observe?: 'body', reportProgress?: boolean): Observable<DoorPage>;
    public doorControllerGetDoorsPage(page?: number, limit?: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<DoorPage>>;
    public doorControllerGetDoorsPage(page?: number, limit?: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<DoorPage>>;
    public doorControllerGetDoorsPage(page?: number, limit?: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {



        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (page !== undefined && page !== null) {
            queryParameters = queryParameters.set('page', <any>page);
        }
        if (limit !== undefined && limit !== null) {
            queryParameters = queryParameters.set('limit', <any>limit);
        }

        let headers = this.defaultHeaders;

        // authentication (cookie) required
        if (this.configuration.apiKeys && this.configuration.apiKeys["connect.sid"]) {
            queryParameters = queryParameters.set('connect.sid', this.configuration.apiKeys["connect.sid"]);
        }

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.request<DoorPage>('get',`${this.basePath}/door/list`,
            {
                params: queryParameters,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Test the existing door
     * 
     * @param doorId 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public doorControllerTestDoor(doorId: number, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public doorControllerTestDoor(doorId: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public doorControllerTestDoor(doorId: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public doorControllerTestDoor(doorId: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (doorId === null || doorId === undefined) {
            throw new Error('Required parameter doorId was null or undefined when calling doorControllerTestDoor.');
        }

        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});

        let headers = this.defaultHeaders;

        // authentication (cookie) required
        if (this.configuration.apiKeys && this.configuration.apiKeys["connect.sid"]) {
            queryParameters = queryParameters.set('connect.sid', this.configuration.apiKeys["connect.sid"]);
        }

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.request<any>('put',`${this.basePath}/door/${encodeURIComponent(String(doorId))}/test`,
            {
                params: queryParameters,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Update the existing door
     * 
     * @param body 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public doorControllerUpdateDoor(body: UpdateDoorDto, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public doorControllerUpdateDoor(body: UpdateDoorDto, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public doorControllerUpdateDoor(body: UpdateDoorDto, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public doorControllerUpdateDoor(body: UpdateDoorDto, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (body === null || body === undefined) {
            throw new Error('Required parameter body was null or undefined when calling doorControllerUpdateDoor.');
        }

        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});

        let headers = this.defaultHeaders;

        // authentication (cookie) required
        if (this.configuration.apiKeys && this.configuration.apiKeys["connect.sid"]) {
            queryParameters = queryParameters.set('connect.sid', this.configuration.apiKeys["connect.sid"]);
        }

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected != undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }

        return this.httpClient.request<any>('put',`${this.basePath}/door`,
            {
                body: body,
                params: queryParameters,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

}
