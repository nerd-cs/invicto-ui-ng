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
import { TypeTierAdminOption } from './typeTierAdminOption';
import { TypeUserRole } from './typeUserRole';

export interface CreateCollaboratorDto { 
    email: string;
    fullName: string;
    companyId: number;
    role: TypeUserRole;
    roleOption?: TypeTierAdminOption;
}