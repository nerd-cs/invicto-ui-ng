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
import { Company } from './company';
import { TypeUserRoleOutput } from './typeUserRoleOutput';
import { TypeUserStatus } from './typeUserStatus';

export interface UserWithAccessGroups { 
    id: number;
    fullName: string;
    email: string;
    profilePicture: string;
    roles: Array<TypeUserRoleOutput>;
    status: TypeUserStatus;
    accessGroups: Array<string>;
    createdAt: Date;
    company: Company;
}