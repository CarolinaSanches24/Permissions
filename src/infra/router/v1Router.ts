import { Router } from "express";
import { userRouter } from "../../modules/user/infra/router/userRouter";
import { permissionRouter } from "../../modules/permissions/infra/router/permissionRouter";
import { roleRouter } from "../../modules/roles/infra/router/roleRouter";

const v1Router : Router = Router();

v1Router.get('/', (req, res)=>{
    res.send({message:'ok'});
});

v1Router.use('/auth/user', userRouter);
v1Router.use('/auth/permission', permissionRouter);
v1Router.use('/auth/role', roleRouter);

export{v1Router}