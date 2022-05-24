import Vue from 'vue'
import { NavBar } from 'vant';
import { Form } from 'vant';
import { Field } from 'vant';
import { Button } from 'vant';
import { Toast } from 'vant';
import { Tabbar, TabbarItem } from 'vant';
import { Image as VanImage } from 'vant';
import { Col, Row } from 'vant';
import { Icon } from 'vant';
import { Cell, CellGroup } from 'vant';
import { Dialog } from 'vant';
import { Popup } from 'vant';
import { DatetimePicker } from 'vant';
import { Uploader } from 'vant';

Vue.use(Uploader);
Vue.use(DatetimePicker);
Vue.use(Popup);
// 全局注册
Vue.use(Dialog);
Vue.use(Cell);
Vue.use(CellGroup);
Vue.use(Icon);
Vue.use(Col);
Vue.use(Row);
Vue.use(VanImage);
Vue.use(Tabbar);
Vue.use(TabbarItem);
Vue.use(Toast);
Vue.use(Button);
Vue.use(Form);
Vue.use(Field);
Vue.use(NavBar)