import Vue from 'vue'
import {
  Button,
  Form,
  FormItem,
  Input,
  Checkbox,
  Message,
  Container,
  Header,
  Aside,
  Main,
  Menu,
  MenuItem,
  MenuItemGroup,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Submenu,
  Breadcrumb,
  BreadcrumbItem,
  Card,
  Row,
  Col,
  Timeline,
  TimelineItem,
  Table,
  TableColumn,
  Switch,
  Tooltip,
  Pagination,
  Dialog,
  Select,
  Option,
  MessageBox,
  Tag,
  Upload,
  Image,
  Transfer,
  Avatar,
  Notification,
  Step,
  Steps,
  Tabs,
  TabPane,
  InputNumber
} from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(InputNumber)
Vue.use(Steps)
Vue.use(Step)
Vue.use(Avatar)
Vue.use(Transfer)
Vue.use(Image)
Vue.use(Upload)
Vue.use(Tag)
Vue.use(Dropdown);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(Option)
Vue.use(Select)
Vue.use(Dialog)
Vue.use(Pagination)
Vue.use(Tooltip)
Vue.use(Switch)
Vue.use(TableColumn)
Vue.use(Table)
Vue.use(Row)
Vue.use(Col)
Vue.use(Card)
Vue.use(BreadcrumbItem)
Vue.use(Breadcrumb)
Vue.use(MenuItemGroup)
Vue.use(MenuItem)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(Checkbox)
Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Input)
Vue.use(Button)
Vue.use(FormItem)
Vue.use(Form)
Vue.use(Timeline)
Vue.use(TimelineItem)
Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$notify = Notification
