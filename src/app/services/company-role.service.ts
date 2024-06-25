import { IResponseInterface } from "../interfaces/api-response.interface";
import { ISettingCompanyRole } from "../interfaces/settings/comapny-role-settings.interface";
import { HttpService } from "./base.service";

class CompanyRoleService extends HttpService {
    private readonly prefix: string = 'api/setting/company-role';

    httpGetAllCompanyRoles = (): Promise<IResponseInterface<ISettingCompanyRole[]>> => this.get(this.prefix);

    httpGetCompanyRoleById = (id: string): Promise<IResponseInterface<ISettingCompanyRole>> => this.get(`${this.prefix}/${id}`);

    httpCreateCompanyRole = (data: {
        name: string;
        permissions: string[];
    }): Promise<IResponseInterface<ISettingCompanyRole>> => this.post(this.prefix, data);

    httpUpdateCompanyRoleById = (id: string, data: {
        name: string;
        permissions: string[];
    }): Promise<IResponseInterface<ISettingCompanyRole>> => this.put(`${this.prefix}/${id}`, data);
}

const companyRoleService = new CompanyRoleService();

export default companyRoleService;