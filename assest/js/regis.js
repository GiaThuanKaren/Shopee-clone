const $=document.querySelector.bind(document)
const $$=document.querySelectorAll.bind(document)
const Store=localStorage;
const BackBtnForm=$('.auth-form__controls-back');
const inputemail=$('.auth-form__input[type="email"]')
const inputPass=$('.auth-form__input[type="password"]')
const inputRePass=$('.auth-form__input[type="password"].passInput')
const KeyRegis='KeyRegis'

ValidateForm();
function ValidateForm() {
    let res,res1,res2;
    inputemail.oninput=function(e){
        res=this.value.trim();
        
    }
    inputPass.oninput=function(e){
        res1=this.value.trim()
        
        
    }
    inputRePass.oninput=function(e){
        res2=this.value.trim();
        
    }
    $('.auth-form__controls .btn').onclick=function(){
        if(res1.toLowerCase()!=res2.toLowerCase()) alert("Mật khẩu không hợp lệ") 
        else {
            let convert=res.substr(0,res.indexOf('@')-1);
            SetRegis(convert,res1);
        }
    }
}

window.onload=function(){
    console.log("Loading");
}

function SetRegis(string,pass){
    console.log(string);
    let value={
        user:false,
        password:`${pass}`
    }
    alert("Đăng ký thành công");
    Store.setItem(KeyRegis,JSON.stringify(value));
    window.location.href='./index.html'
}
