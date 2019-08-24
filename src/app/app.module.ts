import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductListComponent } from './product-list/product-list.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { ProductAlertsComponent } from './product-alerts/product-alerts.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { CartComponent } from './cart/cart.component';
import { ShippingComponent } from './shipping/shipping.component';
import { LoginComponent } from './login/login.component';
import { MessagesComponent } from './messages/messages.component';

// import { CartService } from './cart.service';
import { ChannelService } from './business/channel.service';
import { ConversationService } from './business/conversation.service';
import { MesssagesChannelComponent } from './messsages-channel/messsages-channel.component';

@NgModule({
  imports: [
    BrowserModule,
    // AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', component: ProductListComponent },
      { path: 'products/:productId', component: ProductDetailsComponent },
      { path: 'cart', component: CartComponent },
      { path: 'shipping', component: ShippingComponent },

      { path: 'login', component: LoginComponent },
      { path: 'messages', component: MessagesComponent },
      { path: 'messages/channel/:chid', component: MesssagesChannelComponent },
    ])
  ],
  declarations: [
    AppComponent,
    TopBarComponent,
    ProductListComponent,
    ProductAlertsComponent,
    ProductDetailsComponent,
    CartComponent,
    ShippingComponent,
    LoginComponent,
    MessagesComponent,
    MesssagesChannelComponent,
  ],
  providers: [
    // CartService,
    ChannelService,
    ConversationService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
