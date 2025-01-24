import { createMongoAbility } from '@casl/ability';
import { PermissionRule } from '../types/models';


type Ability = ReturnType<typeof createMongoAbility>;

//Singleton instance of ability
let abilityInstance: Ability | null = null;

export const createAbilityFromPermissions = (permissions: PermissionRule[]) => {
  if (!abilityInstance) {
     abilityInstance = createMongoAbility(permissions);
  }
  return abilityInstance;
};

export const clearAbility = () => {
  abilityInstance = null;
};

export const getAbility = () => {
    return abilityInstance;
  };