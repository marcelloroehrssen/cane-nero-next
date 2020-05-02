
export const HasRole = (user, role) => {
    return user.roles.indexOf(role) > -1;
};
