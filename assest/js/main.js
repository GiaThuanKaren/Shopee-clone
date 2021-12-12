const $=document.querySelector.bind(document)
const $$=document.querySelectorAll.bind(document)
const Maincategory=$$('.category-item');
const Responsivecategory=$$('.mobile-category__item');
const SearchInput=$('.header__search-input');
const ArrCategort=[...Maincategory,...Responsivecategory];
const HeadingSearchResult=$('.header__search-history-heading');
const TestDeafaultSearcg=HeadingSearchResult.innerText;
const SearchListResult=$('.header__search-history-list');
const HeaderCartProduct=$('.header__cart-list-item')
const CartProductKey='KeyCart';
const HistoryKey='KeyHistory';
const ProductType=[
    "Canadian",
    "CertClean",
    "Chemical Free",
    "Dairy Free",
    "EWG Verified",
    "EcoCert",
    "Fair Trade",
    "Gluten Free",
    "Hypoallergenic",
    "Natural",
    "No Talc",
    "Non-GMO",
    "Organic",
    "Peanut Free Product",
    "Sugar Free",
    "USDA Organic",
    "Vegan",
    "alcohol free",
    "cruelty free",
    "oil free",
    "purpicks",
    "silicone free",
    "water free",
]
const ArrBrand=[
    "almay",
    "alva",
    "anna sui",
    "annabelle",
    "benefit",
    "boosh",
    "burt's bees",
    "butter london",
    "c'est moi",
    "cargo cosmetics",
    "china glaze",
    "clinique",
    "coastal classic creation",
    "colourpop",
    "covergirl",
    "dalish",
    "deciem",
    "dior",
    "dr. hauschka",
    "e.l.f.",
    "essie",
    "fenty",
    "glossier",
    "green people",
    "iman",
    "l'oreal",
    "lotus cosmetics usa",
    "maia's mineral galaxy",
    "marcelle",
    "marienatie",
    "maybelline",
    "milani",
    "mineral fusion",
    "misa",
    "mistura",
    "moov",
    "nudus",
    "nyx",
    "orly",
    "pacifica",
    "penny lane organics",
    "physicians formula",
    "piggy paint",
    "pure anada",
    "rejuva minerals",
    "revlon",
    "sally b's skin yummies",
    "salon perfect",
    "sante",
    "sinful colours",
    "smashbox",
    "stila",
    "suncoat",
    "w3llpeople",
    "wet n wild",
    "zorah",
    "zorah biocosmetiques",
    
]
const ProductTag=[
    "Blush",
    "Bronzer",
    "Eyebrow",
    "Eyeshadow",
    "Foundation",
    "Lip liner",
    "Lipstick",
    "Mascara",
    "Nail polish"
]
const Store=localStorage;
const ArrSearchSuggest=[...ArrBrand,...ProductType,...ProductTag];

PreventEmptyLinks();
Category();
SearchFeature();
RenderProducts('https://makeup-api.herokuapp.com/api/v1/products.json?product_type=Blush')
DisplayCartProduct();
GetQuantityCartProduct();

function DisplayCartProduct(){
    $('.header__cart-wrap').onmousemove=function(){
        if(JSON.parse(Store.getItem(CartProductKey))!=[]){
            console.log("Running");
            RenderCartShopping();
            RemoveProductCart();
        }
    }
}

function Category(){
    console.log(1234)
    ArrCategort.forEach(function(item,idx){
        item.onclick=function(){
            console.log(123)
            if(this.className.includes('category-item')){
               $('.category-item.category-item--active').classList.remove('category-item--active');
               this.classList.add('category-item--active'); 
            }
            else console.log(this.className)

            let url=`https://makeup-api.herokuapp.com/api/v1/products.json?product_type=${this.innerText.replace(" ","+")}`
            console.log(url)
            RenderProducts(url)
            

        }
    })

}

function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle...
    while (currentIndex != 0) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
}


function RenderProducts(URL){
    fetch(URL).then(res=>res.json())
    .then(function(items){
        let htmls=items.map(function(item,idx){
            let ranNum=Math.random()*12;
            let html=`
            <div id="${item.id}" class="col l-2-4 m-4 c-6">
                <a class="home-product-item" >
                    <div class="home-product-item__img" style="background-image: url(${item.api_featured_image});"></div>
                    <h4 class="home-product-item__name">${item.name}</h4>
                    <div class="home-product-item__price">
                        <span class="home-product-item__price-old">${item.price ==0.0 ? item.price=10 : item.price*21}$</span>
                        <span class="home-product-item__price-current">${item.price*2}$</span>
                    </div>
                    <div class="home-product-item__action">
                        <span class="home-product-item__like home-product-item__like--liked">
                            <i class="home-product-item__like-icon-empty far fa-heart"></i>
                            <i class="home-product-item__like-icon-fill fas fa-heart"></i>
                        </span>
                        <div class="home-product-item__rating">
                            <i class="home-product-item__star--gold fas fa-star"></i>
                            <i class="home-product-item__star--gold fas fa-star"></i>
                            <i class="home-product-item__star--gold fas fa-star"></i>
                            <i class="home-product-item__star--gold fas fa-star"></i>
                            <i class="home-product-item__star--gold fas fa-star"></i>
                        </div>
                        <span class="home-product-item__sold">Đã bán 89/tháng</span>
                    </div>
                    <div class="home-product-item__origin">
                        <span class="home-product-item__origin-name">TP. Hồ Chí Minh</span>
                    </div>
                    <div class="home-product-item__favourite">
                        <i class="fas fa-check"></i>
                        <span>Yêu thích</span>
                    </div>
                    <div class="home-product-item__sale-off">
                        <span class="home-product-item__sale-off-percent">${Math.floor(ranNum)}%</span>
                        <span class="home-product-item__sale-off-label">GIẢM</span>
                    </div>
                </a>
            </div>    
            
            `;
            return html;

        })
        $('.home-product .row').innerHTML=htmls.join('');

    })
    .finally(function(){

        LikeProduct();
    })
}

function PreventEmptyLinks(){
    $$('a').forEach(function(item){
        item.onclick=function(e){
            if(this.href.endsWith('#') ||this.href.endsWith(''))
            {    e.preventDefault();
                // e.stopPropagation();
            }
            
        }
    })
}

function SearchFeature(){
    let string="";
    let result;
    SearchInput.onfocus=function(){
        RenderHistorySearch();
        SearchKeyWord();


    }

    SearchListResult.onmousedown=function(e){
        e.preventDefault();
    }
    SearchInput.onblur=function(e){
        if(result==[]) HeadingSearchResult.innerText=TestDeafaultSearcg;
        e.preventDefault();
    }
    SearchInput.onkeyup=function(e){
        HeadingSearchResult.innerText='Searching....';
        if(e.key=='Space'){
            string=string.trim();
        }
        else if(e.key =='Backspace'){
            string=string.substr(0,string.length-1);
            if(this.value=="") {
                RenderHistorySearch();
                string ="";
                HeadingSearchResult.innerText=TestDeafaultSearcg;
                result=[];
            }
        }
        else
            if(e.which==13){
                let ResultArr=[];
                HeadingSearchResult.innerText=TestDeafaultSearcg;
                let result=ArrBrand.includes(string);
                if(result!=-1){
                    /* Xử lý logic khi người dùng nhập và search trực tiếp chứ không 
                    phần search gợi ý */
                    // string=string.replace(/\s\s+/g,'+');
                    console.log('Ket qua search '+string);
                    SetItemLocal(HistoryKey,string,Store);
                    let MainURL;
                    for(let item of  ArrSearchSuggest){
                        if(item.indexOf(string)!=-1){
                            if(ArrBrand.includes(item)){
                                item=item.replace(/\s+/g,'+');
                                MainURL=`https://makeup-api.herokuapp.com/api/v1/products.json?brand=${item}`
                            }
                            if(ProductType.includes(item)){
                                item=item.replace(/\s+/g,'+');
                                MainURL=`https://makeup-api.herokuapp.com/api/v1/products.json?product_type=${item}`
                            }
                            if(ProductTag.includes(item)){
                                item=item.replace(/\s+/g,'+');
                                MainURL=`https://makeup-api.herokuapp.com/api/v1/products.json?product_tags=${item}`
                            }
                             ResultArr=[...ResultArr,MainURL];
                        }
                    }
                    RenderItemForMainSearch(ResultArr);

                }
                this.blur();
                this.value="";
                string="";
            }  
            else if(e.key!='Shift' && e.key !='Enter' &&e.key !='Backspace' && e.key !='capslock'){
                console.log("Typing");
                string+=e.key;
            }

        if(string!="")
            result=SuggestSearch(string.toLowerCase());
            
        // console.log(result,string)
        if(result!=[]){
            // console.log(result);
           let htmls= result.map(function(item,idx){
                return`
                <li class="header__search-history-item " >
                    <a href="" >${item.product}</a>
                     <div class="header__search-history-item-tag ${item.Type.replace(' ','')}">${item.Type}</div>
                </li>
                `;
            })


            // <a href="" >${item.product}</a>
            // <div class="header__search-history-item-tag ${item.Type.replace(' ','')}">${item.Type}</div>
            SearchListResult.innerHTML=htmls.join('');
            SearchKeyWord()
        }
        
    }
}
/* Do là mỗi lần search có thể là thuộc product tag ,type,brand
    dẫn đến có nhiều kết quả search trong cùng 1 lần search
    nên không tái sử dụng dược hàm RenderProducts()
    vì hàm RenderProducts dùng innerHTML(chèn thằng mới vào thằng cũ)
    nên khi mỗi lần fetch nhiều lần khác nhau sẽ gây mất kết quả tìm kiểm 
    từ những lần fetch trước
*/
function SearchString(string){


}

function RenderItemForMainSearch(urlarr){
    // console.log($('.home-product .row'));
    /* Trước khi mình cho dữ liệu mới chèn vào thì mình phải cho nó rỗng trong dom vì
    trong hàm này mình dùng  insertAdjacentHTML() nếu không xóa bên trong cái danh sách
    thì khi dùng phương thức trên sẽ tiếp tục render trên UI cũ */
    $('.home-product .row').innerHTML='';

    for(let x of urlarr){
        fetch (x).then(res=>res.json())
        .then(function(item){
            /* nếu fetch trả về có dữ liệu 
            là một mảng khác rỗng thì cho tiếp tục xử lý UI */
            if(item!=[]) {
                item.forEach(function(item,idx){
                    let ranNum=Math.random()*12;
                    let html=`
                    <div id="${item.id}" class="col l-2-4 m-4 c-6">
                        <a class="home-product-item" >
                            <div class="home-product-item__img" style="background-image: url(${item.api_featured_image});"></div>
                            <h4 class="home-product-item__name">${item.name}</h4>
                            <div class="home-product-item__price">
                                <span class="home-product-item__price-old">${item.price ==0.0 ? item.price=10 : item.price*21}$</span>
                                <span class="home-product-item__price-current">${item.price*2}$</span>
                            </div>
                            <div class="home-product-item__action">
                                <span class="home-product-item__like home-product-item__like--liked">
                                    <i class="home-product-item__like-icon-empty far fa-heart"></i>
                                    <i class="home-product-item__like-icon-fill fas fa-heart"></i>
                                </span>
                                <div class="home-product-item__rating">
                                    <i class="home-product-item__star--gold fas fa-star"></i>
                                    <i class="home-product-item__star--gold fas fa-star"></i>
                                    <i class="home-product-item__star--gold fas fa-star"></i>
                                    <i class="home-product-item__star--gold fas fa-star"></i>
                                    <i class="home-product-item__star--gold fas fa-star"></i>
                                </div>
                                <span class="home-product-item__sold">Đã bán 89/tháng</span>
                            </div>
                            <div class="home-product-item__origin">
                                <span class="home-product-item__origin-name">TP. Hồ Chí Minh</span>
                            </div>
                            <div class="home-product-item__favourite">
                                <i class="fas fa-check"></i>
                                <span>Yêu thích</span>
                            </div>
                            <div class="home-product-item__sale-off">
                                <span class="home-product-item__sale-off-percent">${Math.floor(ranNum)}%</span>
                                <span class="home-product-item__sale-off-label">GIẢM</span>
                            </div>
                        </a>
                    </div> 
                    `;
                    $('.home-product .row').insertAdjacentHTML('beforeend',html);
                })

            }
            
        })
        .finally(function(){

            LikeProduct();
        })
    }
    

}

function SearchKeyWord(){
    const SearchItem=$$('.header__search-history-item');
    
    SearchItem.forEach(function(item,idx){
        item.onclick=function(){
            console.log(2345)
            let Type=item.children[1].classList[1];
            SetItemLocal(HistoryKey,item.children[0].innerText,Store);
            let product=item.children[0].innerText.replace(/ /g,'+');
            if(Type=='ProductType'){
                let url=`https://makeup-api.herokuapp.com/api/v1/products.json?product_tags=${product}`
                RenderProducts(url);
            }
            if(Type=='Tag'){
                let url=`https://makeup-api.herokuapp.com/api/v1/products.json?product_type=${product}`
                RenderProducts(url);
            }
            else{
                let url=`https://makeup-api.herokuapp.com/api/v1/products.json?brand=${product}`
                RenderProducts(url);
            }
        }
    })

}

function SuggestSearch(string){
    let arr=[];
    ArrSearchSuggest.forEach(function(item){
        if(item.toLowerCase().indexOf(string)!=-1) {
            let result
            if(ProductType.includes(item)){
                result={
                    Type:"Product Type",
                    product:item
                }
            }
           if(ArrBrand.includes(item)){
                result={
                    Type:"Brand",
                    product:item
                }
            }
            if(ProductTag.includes(item)){
                result={
                    Type:"Tag",
                    product:item
                }
            }
            arr.push(result);
        }
    })
    return arr;
}

function SetItemLocal(key,item,NameLocal){
    let ArrItem=[];
    let res=JSON.parse(NameLocal.getItem(key));
    if(res==null){
        ArrItem.push(item)
    }else {
        let findDuplicate;
        if(key==CartProductKey){
            findDuplicate=res.find(function(item1,idx){
                    return item1.NameProduct==item.NameProduct;
            })
        }else{
            findDuplicate=res.find(function(item1,idx){
                return item1==item;
            })   
        }
       /* Nếu tìm thấy phần tử đã bỏ vào giỏ hàng thì không cần bỏ thêm
        vào localStorage nữa (không thêm khi findDuplicate khác undefined)
            Ngược lại sẽ thêm nếu không tìm thấy phần tử giống 
        */
        if(findDuplicate != undefined) return;
        if(key==CartProductKey){
            let numProduct=$('.header__cart-notice').innerText-0;
            numProduct++;
        }
        const string=res;
        ArrItem=[...string,item];
    }
    NameLocal.setItem(key,JSON.stringify(ArrItem));   
}

function LikeProduct(){
    const HeartIconFill=$$('.home-product-item__like--liked .home-product-item__like-icon-fill');
    const HeartIconEmpty=$$('.home-product-item__like-icon-empty');
    HeartIconFill.forEach(function(item,idx){
        item.onclick=function(){
            let parentElement=this.offsetParent
            let NameProduct=parentElement.children[1].innerText;
            let PriceProduct=parentElement.children[2].children[1].innerText;
            let ImageURl=parentElement.children[0].style.backgroundImage
            // console.log(NameProduct,PriceProduct);
            let Product={
                NameProduct,
                PriceProduct,
                ImageURl
            }
            
            SetItemLocal(CartProductKey,Product,Store);
            GetQuantityCartProduct();
        }
    })
}

function RenderHistorySearch(){
    console.log("Running");
    let HistoryArr=JSON.parse(Store.getItem(HistoryKey));
    console.log(HistoryArr);
    if(HistoryArr!=null){
        let htmls=HistoryArr.map(function(item,idx){
            return `
            <li class="header__search-history-item " >
                 <a href="" >${item}</a>
                 <i class="delete-icon-history-search fas fa-times"></i>
             </li>
            
            `;
        })
        SearchListResult.innerHTML=htmls.join('');
        RemoveHistory();
    }
    
    
    // SearchListResult
}

function RenderCartShopping(){
    let CartArr=JSON.parse(Store.getItem(CartProductKey));
    if(CartArr!=null){
        let htmls=CartArr.map(function(item,idx){
            let string=item.ImageURl;
            let url=string.substring( string.indexOf('"')+1,string.lastIndexOf('"'))
            return `
            <li class="header__cart-item">
                <img src="${url}" alt="" class="header__cart-img">
                <div class="header__cart-item-info">
                    <div class="header__cart-item-head">
                        <h5 class="header__cart-item-name">${item.NameProduct}</h5>
                        <div class="header__cart-item-price-wrap">
                            <span class="header__cart-item-price">${item.PriceProduct}</span>
                            <span class="header__cart-item-multiply">x</span>
                            <span class="header__cart-item-qnt">1</span>
                        </div>
                    </div>

                    <div class="header__cart-item-body">
                        <span class="header__cart-item-description">
                            Phân Loại Hàng: Product
                        </span>
                        <span class="header__cart-item-remove">Xoá</span>
                    </div>
                </div>
            </li>


            `
        })
        HeaderCartProduct.innerHTML=htmls.join('');
    }

}

function GetQuantityCartProduct(){
    let Quantity=JSON.parse(Store.getItem(CartProductKey));
    if(Quantity==null){
        $('.header__cart-notice').innerText=0;    
    }
    else   $('.header__cart-notice').innerText=Quantity.length ;
    return $('.header__cart-notice').innerText-0;
}

function RemoveProductCart(){
    const RemoveBtn=$$('.header__cart-item-remove');
    RemoveBtn.forEach(function(item,idx){
        item.onclick=function(){
            const item1=$$('.header__cart-item-name')[idx].innerText;
            // $$('.header__cart-item')[idx].remove();
            RemoveItemLocal(CartProductKey,item1,Store);
        }
    })
}

function RemoveHistory(){
    let btndel=$$('.delete-icon-history-search')
    btndel.forEach(function(item,idx){
        item.onclick=function(e){
            e.stopPropagation()
            let string=$$('.header__search-history-item a')[idx].innerText;
            console.log(string);
            RemoveItemLocal(HistoryKey,string,Store)
        }
    })
}

function RemoveItemLocal(key,item,NameLocal){
    let ArrItem=[];
    let res=[]
    res=JSON.parse(NameLocal.getItem(key));
    console.log(res)
    if(res!=null){
        if(key==HistoryKey){
            console.log("History ")
            ArrItem=res.filter(function(item1){
                return item1!=item
            })
            // console.log(ArrItem);
            console.log(ArrItem)
            res=JSON.stringify(ArrItem);
            NameLocal.setItem(key,res);
            RenderHistorySearch();
        }
        else{
            console.log("Cart",item)

            ArrItem=res.filter(function(item1){
                return item1.NameProduct!=item
            })
            console.log(ArrItem)
            
            res=JSON.stringify(ArrItem);
            NameLocal.setItem(key,res);
            RenderCartShopping();
            GetQuantityCartProduct();
        }
    } 

}
