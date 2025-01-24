import { AuthProvider, HttpError } from "ra-core";
import data from "./users.json";
import dataProvider from "./dataProvider";
import rolePermission from "./permission.json";
import { clearAbility, createAbilityFromPermissions } from "./abilities/factory";
import _ from 'lodash';


 interface IPermission {
	                permission: {
						resource: string;
						action: string | string[];
					}
				    roleId: number;
			   }

//sample user auth provider....to be replaced with actual auth provider
export const authProvider: AuthProvider = {
	login: async({ email, password }) => {
		const user = data.users.find(
			(u) => u.email === email && u.password === password
		);

		if (user) {
			// eslint-disable-next-line no-unused-vars
			let { password, ...userToPersist } = user;

			//persist user permissions to local storage
		
			const roleId = userToPersist.role == "Admin" ? 1 : 3;
			const permissionsData  = rolePermission.permission.map((p) => {
				if(p.roleId === roleId) {
				  return _.omit({...p.permission, subject: p.permission.resource.toLocaleLowerCase()}, ['resource']);
				}
				return null;
			}).filter(p => p !== null);


			//const permission = _.omit(permissionsData, ['resource']);
			
			localStorage.setItem("user", JSON.stringify(userToPersist));
			localStorage.setItem("permissions", JSON.stringify(permissionsData));
			return Promise.resolve();
		}

		return Promise.reject(
			new HttpError("Unauthorized", 401, {
				message: "Invalid username or password",
			})
		);
	},
	logout: () => {
		localStorage.removeItem("user");
		localStorage.removeItem("permissions");
		clearAbility();
		return Promise.resolve();
	},
	checkError: () => Promise.resolve(),
	checkAuth: () =>
		localStorage.getItem("user") ? Promise.resolve() : Promise.reject(),
	getPermissions: () => {
		return Promise.resolve(undefined);
	},
	getIdentity: () => {
		const persistedUser = localStorage.getItem("user");
		const user = persistedUser ? JSON.parse(persistedUser) : null;

		return Promise.resolve(user);
	},
	async canAccess({ resource, action }) {	
		const subject = resource.toLocaleLowerCase();
		const permissions = JSON.parse(localStorage.getItem('permissions') || '[]');
        if(!permissions) return false;

		//create ability instance with permissions
		const ability = createAbilityFromPermissions(permissions);
		return Promise.resolve(ability?.can(action, subject) ?? false);
	},
};
