import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChatpagePageRoutingModule } from './chatpage-routing.module';

import { ChatpagePage } from './chatpage.page';

import { AutosizeModule } from 'ngx-autosize';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AutosizeModule,
    ChatpagePageRoutingModule,
  ],
  declarations: [ChatpagePage]
})
export class ChatpagePageModule {}
