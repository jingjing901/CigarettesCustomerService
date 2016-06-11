/**
 * Created by jingjing on 16/3/3.
 */
(function () {
    "use strict";

    // Global defenition
    if (typeof App != "object") {
        window.App = {};
    }
    App.qIndex = {};
    
}());

$(function(){
   "use strict";
   App.qIndex={
        init:function(){
          var choseCityJ=$("#chose-cityJ");
          var coverBg=$(".cover-bg");
          var cityJDialog=$(".cityJ-dialog");
          var cityJDD=$(".cityJ-dialog dd");
          var subBtn=$("#sub-btn");
          var hintDialog=$(".hint-dialog");
          var chosenCityJ=$("#chose-cityJ span");
          var getBranch=$("#get-branch");
          var closeBranchPage=$("#close-branch-page");
          var branchPage=$("#branch-page");
          var aTab=$(".ei-top a");
          var license=$(".license");
          var textarea=$("textarea");
          var branchCon=$("#branch-con");
          var evaluteTexts="";
          var arrTabTexts=[];
          var postData={};
          /*标签选中*/
          aTab.each(function(){
            $(this).click(function(){
              if($(this).hasClass("active")){
                $(this).removeClass("active")              
              }else{
                $(this).addClass("active");
              }

              return false;
            });
          });
          /*标签选中*/
          /*选择客服*/
          getBranch.click(function(e){
            //获取所有区数据
            /*callAjax("branchInfoToAppointment",{},function(res){
              if(res){
                branchCon.html("");
                var branchList=res.branchList;
                for(var i=0;i<branchList.length;i++){
                  var html='<div class="item" id="item'+i+'">'+
                    '<div class="item-title f28">'+branchList[i].district+'</div>'+
                    '</div>';
                  branchCon.append($(html));
                  App.qIndex.branchShow($("#item"+i),branchList[i].data);

                }
              }else{
                App.qUtil.errorDialogShow("获取数据失败",false);
              }
            },function(){
                App.qUtil.errorDialogShow("请求失败",false);
            });*/

            App.qUtil.moveInToLeft(branchPage);
            App.qUtil.cancelBubbleAndDefault(e);
          });
          //关闭客服选择页面
          closeBranchPage.click(function(e){
            App.qUtil.moveOutToRight(branchPage);
            App.qUtil.cancelBubbleAndDefault(e);
          });


          //选择地区简称
          choseCityJ.click(function(e){
            App.qUtil.dialogShow(cityJDialog,coverBg);
            App.qUtil.cancelBubbleAndDefault(e);
          });

          //选择地区简称弹框消失
          cityJDD.click(function(e){
            App.qUtil.dialogHide(cityJDialog,coverBg);
            App.qUtil.cancelBubbleAndDefault(e);
          });
          coverBg.click(function(e){
            App.qUtil.dialogHide(cityJDialog,coverBg);
            App.qUtil.dialogHide(hintDialog,coverBg);
            App.qUtil.cancelBubbleAndDefault(e);
          });
          
          $(".cityJ-dialog dd").each(function(){
            $(this).click(function(e){
              App.qIndex.cityJChange($(this),chosenCityJ);
              App.qUtil.cancelBubbleAndDefault(e);
            });
          });

          subBtn.click(function(){license
            if(!App.qUtil.trimStr(license.val())){
                App.qUtil.errorDialogShow("请输入客服编号",false);
                return false;
            }
            /*if(!App.qUtil.trimStr(getBranch.val())){
              App.qUtil.errorDialogShow("请选择门店",false);
              return false;
            }*/

            $(".ei-top a.active").each(function(){
                arrTabTexts.push($(this).text());
            });
            evaluteTexts=textarea.val();
            if(arrTabTexts.length<=0){
              if(App.qUtil.trimStr(textarea.val()).length<10){
                App.qUtil.errorDialogShow("请输入评论不得少于10个字",false);
                return false;
              }
            }
            
            postData={
              "carNo":$(".sccr-cityJ").text()+$(".license").val(),
              "branchId":$("#branchId").val(),
              "branchName":$("#get-branch").val(),
              "branchPhone":$("#branchPhone").val(),
              "branchAddress":$("#branchAddress").val(),
              "tags":arrTabTexts,
              "text":evaluteTexts
            };
            console.log("postData",postData);
            arrTabTexts=[];
            evaluteTexts="";
            window.location.href="../../yancaokefu-new-success.html";
          });

        },
        //切换客服地区
        cityJChange:function(dd,span){
          dd.addClass("active").siblings().removeClass("active");
          span.text(dd.text());
        },
        branchShow:function(districtHtml,data){
          for(var j=0;j<data.length;j++){
            var htm='<div class="item-list" id="'+data[j].branchId+'">'+
                '<div class="il-top">'+
                    '<div class="dis-in f30 branchName">'+data[j].branchName+'</div>'+
                    '<div class="dis-in f24 gray branchPhone">'+data[j].phone+'</div>'+
                '</div>'+
                '<div class="il-bottom f24 gray branchAddress">'+data[j].address+'</div>'+'</div>';
            districtHtml.append($(htm));
          }
          $(".item-list").each(function(){
            $(this).click(function(e){
              App.qUtil.moveOutToRight($("#branch-page"));
              $("#branchId").val($(this).attr("id"));
              $("#branchPhone").val($(this).find(".branchPhone").text());
              $("#branchAddress").val($(this).find(".branchAddress").text());
              $("#get-branch").val($(this).find(".branchName").text());
              App.qUtil.cancelBubbleAndDefault(e);
            });
          });
        }
   };
   $(function(){
        App.qIndex.init();
    });
}());