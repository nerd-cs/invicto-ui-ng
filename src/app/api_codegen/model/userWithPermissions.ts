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
import { TypeUserStatus } from './typeUserStatus';

export interface UserWithPermissions { 
    id: number;
    fullName: string;
    email: string;
    profilePicture: string;
    status: TypeUserStatus;
    phoneNumber: string;
    twoStepAuth: boolean;
    createdAt: Date;
    permissions: string;
}