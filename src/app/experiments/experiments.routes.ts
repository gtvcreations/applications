import { Route } from "@angular/router";
import { titleGetValidNumer } from "./experiments";

export const routeGetValidNumber: Route = {
    path: 'get-valid-number',
    title: titleGetValidNumer,
    loadComponent: () => import('./get-valid-number/get-valid-number.component').then(c => c.GetValidNumberComponent)
}