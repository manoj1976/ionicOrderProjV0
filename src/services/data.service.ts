import { Stock } from './../modals/stock.modal';
import { Salesrep } from './../modals/salesrep.modal';
import { Product } from './../modals/product.modal';
import { errorHandler, INTERNAL_BROWSER_PLATFORM_PROVIDERS } from '@angular/platform-browser/src/browser';
import {Injectable } from '@angular/core';
import {Http,Headers} from '@angular/http';
import { Response } from '@angular/http/src/static_response';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/timeout';
import {AppService} from '../services/app.service';
import {SQLiteHelperService} from '../services/sqlitehelper.service'
import { Customer} from '../modals/customer.modal'
import { ProdCategory } from '../modals/prodcategory.model';
import { CustomerBalance } from '../modals/customerbalance.modal';
import { Order } from '../modals/order.modal';
import { Events } from 'ionic-angular';


@Injectable()
export class DataService{

    constructor(private http:Http,private appsvc:AppService,private sqlitehelperSvc:SQLiteHelperService,private event:Events){
    }
    
    getCustomerListByCounty(parCounty:string):Array<Customer>{
        let customerlist:Array<Customer>=[];
        let str1:string="select code,name,add1,add2,city,county,phone,repid from customer where county ='"+parCounty+"'";
        this.sqlitehelperSvc.executeSQL(str1)
        .then((response:any)=>{
            let cust:Customer;
            for(let i=0;i<response.rows.length;i++){
                cust=new Customer;
                cust.code=response.rows.item(i).code;
                cust.name=response.rows.item(i).name;
                cust.add1=response.rows.item(i).add1;
                cust.add2=response.rows.item(i).add2;
                cust.city=response.rows.item(i).city;
                cust.county=response.rows.item(i).county;
                cust.phone=response.rows.item(i).phone;
                cust.repid= response.rows.item(i).repid;
                customerlist.push(cust);
            }
            return customerlist;
            })
        .catch((error:Error)=>{
            this.appsvc.errorHandler(error);})
        return customerlist;
        
    }

    getCustomerListBySalesrep(parSalesrepid:string):Array<Customer>{
        let customerlist:Array<Customer>=[];
        let str1:string="select code,name,add1,add2,city,county,phone,repid from customer where repid ='"+parSalesrepid+"'";
        this.sqlitehelperSvc.executeSQL(str1)
        .then((response:any)=>{
            let cust:Customer;
            for(let i=0;i<response.rows.length;i++){
                cust=new Customer;
                cust.code=response.rows.item(i).code;
                cust.name=response.rows.item(i).name;
                cust.add1=response.rows.item(i).add1;
                cust.add2=response.rows.item(i).add2;
                cust.city=response.rows.item(i).city;
                cust.county=response.rows.item(i).county;
                cust.phone=response.rows.item(i).phone;
                cust.repid= response.rows.item(i).repid;
                customerlist.push(cust);
            }
            return customerlist;
            })
        .catch((error:Error)=>{
            this.appsvc.errorHandler(error);})
        return customerlist;
        
    }


    getProdCategoryList():Array<ProdCategory>{
        let prodcategorylist:Array<ProdCategory>=[];
        let str1:string='select code,description from productcategory';
        this.sqlitehelperSvc.executeSQL(str1)
        .then((response:any)=>{
            let prodcate:ProdCategory;
            for(let i=0;i<response.rows.length;i++){
                prodcate=new ProdCategory;
                prodcate.code=response.rows.item(i).code;
                prodcate.description=response.rows.item(i).description;
                prodcategorylist.push(prodcate);
            }
            return prodcategorylist;
            })
        .catch((error:Error)=>{
            this.appsvc.errorHandler(error);})
        return prodcategorylist;
    }

    getOrderListFromLocalDB(type:string):Array<Order>{
        let orderlist:Array<Order>=[];
        let str1:string=this.sqlitehelperSvc._readOrderForOrderView;
        if (type=='synchedorder')
            str1 =str1+' and sync=1'
        else if (type=='nonsyncorder')
            str1=str1+' and sync=0';

            str1=str1+' order by custname,orderdate';
        this.sqlitehelperSvc.executeSQL(str1)
        .then((response:any)=>{
            let order:Order;let cust:Customer;
            for(let i=0;i<response.rows.length;i++){
                order=new Order();cust=new Customer();
                cust.code= response.rows.item(i).custcode;
                cust.name=response.rows.item(i).custname;
                cust.repid=response.rows.item(i).repid;
                
                order.orderno=response.rows.item(i).orderno;
                order.orderdate=response.rows.item(i).orderdate;
                order.customer=cust;
                order.ordercontact=response.rows.item(i).ordcontact;
                order.orderref=response.rows.item(i).ordref;
                order.sign=response.rows.item(i).sign;
                order.sync=response.rows.item(i).sync;
                order.syncmsg=response.rows.item(i).syncmsg;
                orderlist.push(order);
            }
            return orderlist;
            })
        .catch((error:Error)=>{
            this.appsvc.errorHandler(error);})
        return orderlist;
    }

    deleteOrder(parOrderno:string){
        let str1:string=this.sqlitehelperSvc._deleteOrder;
        str1=str1+" orderno='"+parOrderno+"'";

        this.sqlitehelperSvc.executeSQL(str1)
        .then((response:any)=>{
        })
        .catch((error:Error)=>{
            this.appsvc.errorHandler(error);})
    }

    getItemsintheOrder(parOrderno:string):Array<Order>{
        let orderlist:Array<Order>=[];
        let str1:string=this.sqlitehelperSvc._readOrderLineForOrderView;

            str1=str1+" and orderno='"+parOrderno+"' order by lineno";
        this.sqlitehelperSvc.executeSQL(str1)
        .then((response:any)=>{
            let order:Order;let cust:Customer;
            for(let i=0;i<response.rows.length;i++){
                order=new Order();
                order.orderno=response.rows.item(i).orderno;
                order.lineno=response.rows.item(i).lineno;
                order.prodcode=response.rows.item(i).prodcode;
                order.proddesc=response.rows.item(i).proddesc;
                order.uom=response.rows.item(i).uom;
                order.unitprice=response.rows.item(i).unitprice;
                order.orderqty=response.rows.item(i).orderqty;
                order.amount=response.rows.item(i).amount;

                orderlist.push(order);
                
            }
            this.event.publish('onReadOrderLineComplete','prodcatesynccompleted');
            return orderlist;
            })
        .catch((error:Error)=>{
            this.appsvc.errorHandler(error);})
        return orderlist;
    }

    getProductList(parProdCateCode:string):Array<Product>{
        let productlist:Array<Product>=[];
        let str1:string="select code,description,detaileddesc,price,stock,uom,prodcategory, prodimagename from product where prodcategory='"+parProdCateCode+"'";
        this.sqlitehelperSvc.executeSQL(str1)
        .then((response:any)=>{
            let product:Product;
            for(let i=0;i<response.rows.length;i++){
                product=new Product;
                product.code=response.rows.item(i).code;
                product.description=response.rows.item(i).description;
                product.detaileddesc=response.rows.item(i).detaileddesc;
                product.price=response.rows.item(i).price;
                product.stock=response.rows.item(i).stock;
                product.uom=response.rows.item(i).uom;
                product.prodcategory=response.rows.item(i).prodcategory;
                if (!this.appsvc.checkNetwork()) //if no network connection, don't show image
                    product.prodimagename='img/thumbnail-totoro.png';
                else
                    product.prodimagename=AppService.getProdimagename(response.rows.item(i).prodimagename);
                
                product.orderqty=1;
                product.amount=this.appsvc.Round(product.orderqty*product.price,2);
                productlist.push(product);
            }
            return productlist;
            })
        .catch((error:Error)=>{
            this.appsvc.errorHandler(error);})
        return productlist;
    }

    getCountyList():Array<Customer>{
        let customerlist:Array<Customer>=[];
        let str1:string='select distinct county from customer';
        this.sqlitehelperSvc.executeSQL(str1)
        .then((response:any)=>{
            let cust:Customer;
            for(let i=0;i<response.rows.length;i++){
                cust=new Customer;
                cust.county=response.rows.item(i).county;
                customerlist.push(cust);
            }
            return customerlist;
            })
        .catch((error:Error)=>{
            this.appsvc.errorHandler(error);})
        return customerlist;
    }

    getProductListForStkCheck(parSrchstring:string):Array<Product>{
        let productlist:Array<Product>=[],varSrchstring:string='';
        varSrchstring=" (lower(code) like '%"+parSrchstring.toLowerCase()+"%') OR (lower(description) like '%"+parSrchstring.toLowerCase()+"%')";
        let str1:string="select code,description from product where "+varSrchstring;
        this.sqlitehelperSvc.executeSQL(str1)
        .then((response:any)=>{
            let product:Product;
            for(let i=0;i<response.rows.length;i++){
                product=new Product;
                product.code=response.rows.item(i).code;
                product.description=response.rows.item(i).description;
                productlist.push(product);
            }
            return productlist;
            })
        .catch((error:Error)=>{
            this.appsvc.errorHandler(error);})
        return productlist;
    }
   
    getCustomerListForBalanceCheck(parSrchstring:string):Array<Customer>{
        let custlist:Array<Customer>=[],varSrchstring:string='';
        varSrchstring=" (lower(code) like '%"+parSrchstring.toLowerCase()+"%') OR (lower(name) like '%"+parSrchstring.toLowerCase()+"%') OR (lower(add1) like '%"+parSrchstring.toLowerCase()+"%') OR (lower(phone) like '%"+parSrchstring.toLowerCase()+"%')";
        let str1:string="select code,name,add1,add2,city,county,phone,repid from customer where "+varSrchstring;
        this.sqlitehelperSvc.executeSQL(str1)
        .then((response:any)=>{
            let cust:Customer;
            for(let i=0;i<response.rows.length;i++){
                cust=new Customer;
                cust.code=response.rows.item(i).code;
                cust.name=response.rows.item(i).name;
                cust.add1=response.rows.item(i).add1;
                cust.add2=response.rows.item(i).add2;
                cust.city=response.rows.item(i).city;
                cust.county=response.rows.item(i).county;
                cust.phone=response.rows.item(i).phone;
                cust.repid= response.rows.item(i).repid;
                custlist.push(cust);
            }
            return custlist;
            })
        .catch((error:Error)=>{
            this.appsvc.errorHandler(error);})
        return custlist;
    }
    
    getSalesrepList():Array<Salesrep>{
        /*
        let salesreplist:Array<Customer>=[];
        let str1:string='select distinct repid from customer';
        this.sqlitehelperSvc.executeSQL(str1)
        .then((response:any)=>{
            let cust:Customer;
            for(let i=0;i<response.rows.length;i++){
                cust=new Customer;
                cust.repid=response.rows.item(i).repid;
                salesreplist.push(cust);
            }
            return salesreplist;
            })
        .catch((error:Error)=>{
            this.appsvc.errorHandler(error);})
        return salesreplist;
        */
        let salesreplist:Array<Salesrep>=[];
        let str1:string='select code,name from salesrep order by name';
        this.sqlitehelperSvc.executeSQL(str1)
        .then((response:any)=>{
            let salesrep:Salesrep;
            for(let i=0;i<response.rows.length;i++){
                salesrep=new Salesrep;
                salesrep.code=response.rows.item(i).code;
                salesrep.name=response.rows.item(i).name;
                salesreplist.push(salesrep);
            }
            return salesreplist;
            })
        .catch((error:Error)=>{
            this.appsvc.errorHandler(error);})
        return salesreplist;
    }

    authUser(parUser:string,parPwd:string):Observable<any>{
        let url=this.appsvc.getFormattedWebAPIURL(AppService.getSettings().WebapiBaseURL);
        url=url+'/Authentication/AuthUser';
        let headers = new Headers();
        //headers.append('Access-Control-Allow-Origin' ,'*');
        headers.append('Content-Type', 'application/json');
        var paramData = {
        userid:parUser,
        pwd:parPwd,
        type:''
        };
        return this.http.get(url,  {headers:headers,params:paramData})
                        .timeout(8000)//8 second
                        .map((data:any)=>data.json());
    }

    RegisterApp(parRegisterDet:any):Observable<any>{
        let url=this.appsvc.getFormattedWebAPIURL(this.appsvc.getOwnerWebAPIURL());
        url=url+'/RegisterApp';
        let headers = new Headers();
        //headers.append('Access-Control-Allow-Origin' ,'*');
        headers.append('Content-Type', 'application/json');
        var paramData = {
        username:parRegisterDet.username,
        useremail:parRegisterDet.youremail,
        regemail:parRegisterDet.regemail,
        appid:this.appsvc.getAppID(),
        compid:this.appsvc.getCompanyID(),
        deviceid:parRegisterDet.deviceid
        };
        return this.http.get(url,  {headers:headers,params:paramData})
                        .map((data:any)=>data.json());
    }

    getStock(parProdcode:string,parBarcode:string):Observable<Stock[]>{
        let url=this.appsvc.getFormattedWebAPIURL(AppService.getSettings().WebapiBaseURL);
        url=url+'/Stock';
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        var paramData = {
        itemno:parProdcode,
        barcode:parBarcode
        };
            return this.http.get(url,  {headers:headers,params:paramData})
                    .map((data:Response)=>data.json());
    }

    getCustomerBalance(parCustcode:string):Observable<CustomerBalance[]>{
        let url=this.appsvc.getFormattedWebAPIURL(AppService.getSettings().WebapiBaseURL);
        url=url+'/CustomerBalance';
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        var paramData = {
        customercode:parCustcode
        };
            return this.http.get(url,  {headers:headers,params:paramData})
                    .map((data:Response)=>data.json());
    }
}
