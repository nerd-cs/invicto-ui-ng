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

import { CreateZoneDto } from '../model/createZoneDto';
import { UpdateZoneDto } from '../model/updateZoneDto';
import { Zone } from '../model/zone';
import { ZonePage } from '../model/zonePage';

import { BASE_PATH, COLLECTION_FORMATS }                     from '../variables';
import { Configuration }                                     from '../configuration';


@Injectable()
export class ZoneService {

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
     * Create new zone
     * 
     * @param body 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public zoneControllerCreateZone(body: CreateZoneDto, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public zoneControllerCreateZone(body: CreateZoneDto, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public zoneControllerCreateZone(body: CreateZoneDto, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public zoneControllerCreateZone(body: CreateZoneDto, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (body === null || body === undefined) {
            throw new Error('Required parameter body was null or undefined when calling zoneControllerCreateZone.');
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

        return this.httpClient.request<any>('post',`${this.basePath}/zone`,
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

    /**
     * Delete the existing zone
     * 
     * @param zoneId 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public zoneControllerDeleteZone(zoneId: number, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public zoneControllerDeleteZone(zoneId: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public zoneControllerDeleteZone(zoneId: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public zoneControllerDeleteZone(zoneId: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (zoneId === null || zoneId === undefined) {
            throw new Error('Required parameter zoneId was null or undefined when calling zoneControllerDeleteZone.');
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

        return this.httpClient.request<any>('delete',`${this.basePath}/zone/${encodeURIComponent(String(zoneId))}`,
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
     * Get all zones for specified location
     * 
     * @param locationId 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public zoneControllerGetAllForLocation(locationId: number, observe?: 'body', reportProgress?: boolean): Observable<Array<Zone>>;
    public zoneControllerGetAllForLocation(locationId: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<Zone>>>;
    public zoneControllerGetAllForLocation(locationId: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<Zone>>>;
    public zoneControllerGetAllForLocation(locationId: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (locationId === null || locationId === undefined) {
            throw new Error('Required parameter locationId was null or undefined when calling zoneControllerGetAllForLocation.');
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

        return this.httpClient.request<Array<Zone>>('get',`${this.basePath}/zone`,
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
     * Get list of zones with pagination
     * 
     * @param page 
     * @param limit 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public zoneControllerGetZonesPage(page?: number, limit?: number, observe?: 'body', reportProgress?: boolean): Observable<ZonePage>;
    public zoneControllerGetZonesPage(page?: number, limit?: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<ZonePage>>;
    public zoneControllerGetZonesPage(page?: number, limit?: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<ZonePage>>;
    public zoneControllerGetZonesPage(page?: number, limit?: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {



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

        return this.httpClient.request<ZonePage>('get',`${this.basePath}/zone/list`,
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
     * Update the existing zone
     * 
     * @param body 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public zoneControllerUpdateZone(body: UpdateZoneDto, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public zoneControllerUpdateZone(body: UpdateZoneDto, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public zoneControllerUpdateZone(body: UpdateZoneDto, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public zoneControllerUpdateZone(body: UpdateZoneDto, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (body === null || body === undefined) {
            throw new Error('Required parameter body was null or undefined when calling zoneControllerUpdateZone.');
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

        return this.httpClient.request<any>('put',`${this.basePath}/zone`,
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
