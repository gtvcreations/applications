import { Route } from "@angular/router";
import { titleInputNumberNativeVsNgModel } from "./researches";

export const routeInputNumberNativeVsNgModel: Route = {
    path: 'input-number-native-vs-ngmodel',
    title: titleInputNumberNativeVsNgModel,
    loadComponent: () => import('./input-number-native-vs-ngmodel/input-number-native-vs-ngmodel.component').then(c => c.InputNumberNativeVsNgmodelComponent) 
};