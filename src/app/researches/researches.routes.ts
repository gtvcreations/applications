import { Route } from "@angular/router";
import { idInputNumberNativeVsNgModel, titleInputNumberNativeVsNgModel } from "./researches";

export const routeInputNumberNativeVsNgModel: Route = {
    path: idInputNumberNativeVsNgModel,
    title: titleInputNumberNativeVsNgModel,
    loadComponent: () => import('./input-number-native-vs-ngmodel/input-number-native-vs-ngmodel.component').then(c => c.InputNumberNativeVsNgmodelComponent) 
};