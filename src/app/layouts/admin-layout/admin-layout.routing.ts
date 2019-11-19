import { Routes } from "@angular/router";

import { DashboardComponent } from "../../pages/dashboard/dashboard.component";
import { RegistrarCandidatoComponent } from "../../pages/registrar-candidato/registrar-candidato.component";
import { CrearVotacionComponent } from '../../pages/crear-votacion/crear-votacion.component';
import { PermitirVotarComponent } from '../../pages/permitir-votar/permitir-votar.component';
import { VotarComponent } from '../../pages/votar/votar.component';
import { IconsComponent } from "../../pages/icons/icons.component";
import { MapComponent } from "../../pages/map/map.component";
import { NotificationsComponent } from "../../pages/notifications/notifications.component";
import { UserComponent } from "../../pages/user/user.component";
import { TablesComponent } from "../../pages/tables/tables.component";
import { TypographyComponent } from "../../pages/typography/typography.component";
// import { RtlComponent } from "../../pages/rtl/rtl.component";

export const AdminLayoutRoutes: Routes = [
  { path: "dashboard", component: DashboardComponent },
  { path: "registrar", component: RegistrarCandidatoComponent },
  { path: "crear", component: CrearVotacionComponent },
  { path: "permitir", component: PermitirVotarComponent },
  { path: "votar", component: VotarComponent },
  { path: "icons", component: IconsComponent },
  { path: "maps", component: MapComponent },
  { path: "notifications", component: NotificationsComponent },
  { path: "user", component: UserComponent },
  { path: "tables", component: TablesComponent },
  { path: "typography", component: TypographyComponent },
  // { path: "rtl", component: RtlComponent }
];
