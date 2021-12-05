const $=document.querySelector.bind(document)
const $$=document.querySelectorAll.bind(document)
const Maincategory=$$('.category-item');
const Responsivecategory=$$('.mobile-category__item');
const ArrCategort=[...Maincategory,...Responsivecategory];

console.log(ArrCategort)
PreventEmptyLinks();
Category();
RenderProducts('http://makeup-api.herokuapp.com/api/v1/products.json?product_type=Blush')
function Category(){
    ArrCategort.forEach(function(item,idx){
        item.onclick=function(){
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



function RenderProducts(URL){
    fetch(URL).then(res=>res.json())
    .then(function(items){
        let htmls=items.map(function(item,idx){
            let html=`
            <div id="${item.id}" class="col l-2-4 m-4 c-6">
                <a class="home-product-item" href="">
                    <div class="home-product-item__img" style="background-image: url(${item.image_link || item.api_featured_image});"></div>
                    <h4 class="home-product-item__name">${item.name}</h4>
                    <div class="home-product-item__price">
                        <span class="home-product-item__price-old">${item.price ==0.1 ? item.price=10 : item.price *10}$</span>
                        <span class="home-product-item__price-current">${item.price}$</span>
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
                        <span class="home-product-item__sale-off-percent">12%</span>
                        <span class="home-product-item__sale-off-label">GIẢM</span>
                    </div>
                </a>
            </div>    
            
            `;
            return html;

        })
        $('.home-product .row').innerHTML=htmls.join('');

    })
}

function PreventEmptyLinks(){
    $$('a').forEach(function(item){
        item.onclick=function(e){
            if(this.href.endsWith('#'))
                e.preventDefault();
        }
    })
}