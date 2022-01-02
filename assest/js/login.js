const $=document.querySelector.bind(document)
const $$=document.querySelectorAll.bind(document)
const Emailinput=$('.auth-form__input[type="email"]')
const PassInput=$('.auth-form__input[type="password"]')
const KeyRegis='KeyRegis'
ValidateLogin();
function ValidateLogin(){
    let res1,res;
    let getitem=JSON.parse(localStorage.getItem(KeyRegis));
    // console.log()
    Emailinput.oninput=function(){
        res=this.value;
    }

    PassInput.oninput=function(){
        res1=this.value;
    }
    $('.auth-form__controls .btn').onclick=function(){
        if(getitem==null) alert("Tài khoản không tồn tại")
        else {
            if(res1!=getitem.password) alert("Thông Tin Nhập Không Đúng");
            else {
                getitem.user=true;

                localStorage.setItem(KeyRegis,JSON.stringify(getitem));
                alert("Đăng nhập thành công");
                window.location.href='./index.html'
            }
        }
        
        
    }
}