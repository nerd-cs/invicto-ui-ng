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
 */
import { LocationResponse } from './locationResponse';

export interface AccessGroupInfo { 
    id: number;
    isActive: boolean;
    name: string;
    location: LocationResponse;
    lastActivity: Date;
    zones: Array<string>;
}