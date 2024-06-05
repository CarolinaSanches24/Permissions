import { Router } from "express";
import { userRouter } from "../../modules/user/infra/router/userRouter";
import { permissionRouter } from "../../modules/permissions/infra/router/permissionRouter";

const v1Router : Router = Router();

v1Router.get('/', (req, res)=>{
    res.send({message:'ok'});
});

v1Router.use('/auth/user', userRouter);
v1Router.use('/auth/permission', permissionRouter);

export{v1Router}