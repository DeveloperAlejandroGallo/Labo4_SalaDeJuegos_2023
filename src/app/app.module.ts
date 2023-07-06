import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// Forms
import { ReactiveFormsModule, FormsModule } from '@angular/forms'
// Peticiones Http
import { HttpClientModule } from '@angular/common/http'

//Material
//Tablas
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';

//Formularios
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule} from '@angular/material/button';
import { MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core'; //para el datepicker
import { MatCardModule } from '@angular/material/card'

//Iconos
import { MatIconModule }  from '@angular/material/icon';
//Modales
import { MatDialogModule }  from '@angular/material/dialog';
//Grillas
import { MatGridListModule }  from '@angular/material/grid-list';
//Toolbar
import { MatToolbarModule }  from '@angular/material/toolbar';
//
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatListModule } from '@angular/material/list'
import { MatDividerModule } from '@angular/material/divider'


import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideDatabase,getDatabase } from '@angular/fire/database';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { provideStorage,getStorage } from '@angular/fire/storage';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './pages/home/home.component';
import { QuienSoyComponent } from './pages/quien-soy/quien-soy.component';
import { ErrorComponent } from './pages/error/error.component';
import { LoginComponent } from './pages/login/login.component';
import { ToastMsgService } from './services/toast-msg.service';
import { ChatComponent } from './pages/chat/chat.component';
import { FilterUserPipe } from './pipes/filter-user.pipe';
import { UserTableComponent } from './components/user-table/user-table.component';
import { ChatTableComponent } from './components/chat-table/chat-table.component';
import { ListadosComponent } from './pages/listados/listados.component';
import { EncuestaComponent } from './pages/encuesta/encuesta.component';
import { AdminEncuestaComponent } from './pages/admin/admin-encuesta/admin-encuesta.component';
import { NavVarModule } from './components/nav-var/nav-var.module';
import { FilterPartidasPipe } from './pipes/filter-partidas.pipe';
import { DateIsoToDatePipe } from './pipes/date-iso-to-date.pipe';
import { EncuestaResponderComponent } from './pages/encuestas/encuesta-responder/encuesta-responder.component';
import { EncuestaVerComponent } from './pages/encuestas/encuesta-ver/encuesta-ver.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    QuienSoyComponent,
    ErrorComponent,
    ChatComponent,
    FilterUserPipe,
    UserTableComponent,
    ChatTableComponent,
    ListadosComponent,
    EncuestaComponent,
    AdminEncuestaComponent,
    FilterPartidasPipe,
    DateIsoToDatePipe,
    EncuestaResponderComponent,
    EncuestaVerComponent,


  ],
  imports: [
    NavVarModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatCardModule,
    MatDatepickerModule,
    MatDialogModule,
    MatFormFieldModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatSelectModule,
    MatTableModule,
    MatToolbarModule,
    ReactiveFormsModule,
    MatListModule,
    MatDividerModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
  ],
  providers: [ToastMsgService],
  bootstrap: [AppComponent]
})
export class AppModule { }
