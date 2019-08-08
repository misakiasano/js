

var casseteController = {
	load : function(){
        $.ajax({
            type: 'GET',
            url: '/json/product.json',
            success: this.init.bind(this),
            error : function(XMLHttpRequest, textStatus, errorThrown){
            console.log(textStatus);
            }
        });
	},
    
	init : function(data){
		this.data = data;
        this.constructCassettes();
        this.setParameters();
        this.changePage();
	},
    
    setParameters : function(){
        this.searchController = searchController.init(this);
        this.paginationController = paginationController.init(this);
    },
    
	constructCassettes : function(){
		var $dressList = $('.jsc-dress-list');
        $template = $dressList.children('li').detach();
        fragment = document.createDocumentFragment();
        var colorSelection = $('.jsc-color-selection');
        var sizeSelection = $('.jsc-size-selection');
        
        for(var i = 0, count = this.data.length; i<count; i++){
            var $cassette = $template.clone();
            $cassette.find('.jsc-dress-image').attr('src',this.data[i]['image_url_top']);
            $cassette.find('.jsc-clothes-size').text(this.data[i]['dress_size']);
            $cassette.find('.jsc-clothes-price').text('¥' + this.data[i]['rent_price']);
            this.parentId = this.data[i]['special_parent_id'];
            this.colorSystem = this.data[i]['dress_colorsystem'];
            fragment.appendChild($cassette.get(0));
        }
        $dressList.get(0).appendChild(fragment);
        this.$cassettes = $dressList.children();
        
	},
    
    showResult : function(condition){
        var myself = this;
        this.$selectedCassettes = this.$cassettes;
        if(condition != this.$cassettes){
            this.$cassettes.hide();
           
            $.each(this.data,function(index){
                var element = this;
                var agreementColor = true;
                var agreementSize = true;
                var agreementScene = true;
                
                
                if(condition["color"].length >= 1) {
                   for(var i = 0, count = condition["color"].length; i<=count; i++){
                        agreementColor = false;
                        if(condition["color"][i] == element.dress_colorsystem){
                            agreementColor = true;
                            break;
                        }
                    }
                 }
                    
                if(condition["size"].length >= 1) {
                    for(var i = 0, count = condition["size"].length; i<count; i++){
                        agreementSize = false;
                        if(condition["size"][i] == element.dress_size){
                            agreementSize = true;
                            break;
                        }
                    }
                }
                
                if(condition.scene >= 1) {
                    for(var i = 0, count = element["special_parent_id"].length; i<count; i++){
                        agreementScene = false;
                        if(element["special_parent_id"][i] == condition.scene ){
                            agreementScene = true;
                            break;
                        }
                    }
                }
                  
                myself.$cassettes.eq(index).removeClass('showDress');
                if(agreementColor && agreementSize && agreementScene){
                    myself.$cassettes.eq(index).addClass('showDress');
                }
            
            });
            
            this.$selectedCassettes = this.$cassettes.filter('.showDress');
            this.$selectedCassettes.show();
        
            
            var dressCount = $('.jsc-dress-count');
            var showLength = this.$selectedCassettes.length;
            dressCount.text(showLength);
        
            
            var tabSelector1 = $('.jsc-selector1'); 
            var tabSelector2 = $('.jsc-selector2');
            var colorSelection = $('.jsc-color-selection');
            var colorSelectionDD = colorSelection.find('dd');
            var sizeSelection = $('.jsc-size-selection');
            var sizeSelectionDD = sizeSelection.find('dd');
            var sceneSelection = $('.jsc-scene-selection')
            var sceneSelectionDD = sceneSelection.find('dd')


            if(tabSelector1.is('.selected')){
                colorSelection.removeClass('show-Selection');
                sizeSelection.removeClass('show-Selection');
                sceneSelection.addClass('show-Selection');
                
                var joinColorText =condition["colorText"].join( '/' ); 
                colorSelectionDD.text(joinColorText);           

                var joinSizeText =condition["size"].join( '/' ); 
                sizeSelectionDD.text(joinSizeText); 
            }else if(tabSelector2.is('.selected')){
                colorSelection.addClass('show-Selection');
                sizeSelection.addClass('show-Selection');
                sceneSelection.removeClass('show-Selection');
                var insCeneText = condition["sceneText"];
                sceneSelectionDD.text(insCeneText)
                
            }

            
        }
           //(ページ数)
          var pageCount = this.$selectedCassettes;
          this.paginationController.constructPages(pageCount);
       
    },
    
    changePage : function(pageIndex){// ページ切り替え
     
        
	}

};



//設計 サーチ

var searchController = {
	init : function(casseteController){
		this.casseteController = casseteController;
        this.searchDress();
		return this;//searchController自身を返している
	},
	
	searchDress : function(){
		// 検索ボタンを押した時の処理
        var self = this;
        var condition = {
            "color" : [],
            "size" : [],
            "scene" : '',
            "colorText" : [],
            "sceneText" : '',
        };
        
        var colorContainerLabel = $('.jsc-color').find('label');
        var sizeContainer = $('.jsc-size').find('label');
        var sceneContainer = $('#jsi-container2').find('label');
        $('.search').on('click',function(){
            condition['color'] = [];
            condition['colorText'] = [];
            colorContainerLabel.each(function(){
                var $element = $(this);
                var colorInput = $element.find('input')
                var colorSpanText = $element.find('span')
                if(colorInput.is(':checked')){
                    var colorId = colorInput.data('color');
                    var colorIdText = colorSpanText.text();
                    condition['color'].push(colorId);
                    condition['colorText'].push(colorIdText);
                }
            });
            
            condition['size'] = [];
            sizeContainer.each(function(){
                var $element = $(this); 
                var sizeInput = $element.find('input');
                var sizeSpan = $element.find('span');
                if(sizeInput.is(':checked')){
                    var sizeText = sizeSpan.text();
                    condition['size'].push(sizeText);
                }  
            });
            
            condition['scene'] = '';
            sceneContainer.each(function(){
                var $element = $(this);
                var sceneInput = $element.find('input');
                var sceneSpanText = $element.find('span');
                if(sceneInput.is(':checked')){
                    var sceneId = sceneInput.data('scene'); 
                    var sceneIdText = sceneSpanText.text();
                    condition['scene'] = sceneId;
                    condition['sceneText'] = sceneIdText;
                } 
            });
    
//            console.log(condition);
            self.casseteController.showResult(condition);
        });
    }

};


//ページネーション

var paginationController = {
    init : function(casseteController){
		this.casseteController = casseteController;
		return this;
	},
    
	constructPages : function(pageCount){   //(ページ数)
//        fragment = document.createDocumentFragment();
        var $pagination = $('.pagination');
        var $paginationLi = $pagination.find('li')
        var pagiRemove = $paginationLi.remove();
        var pagiCassette = pagiRemove.clone();
        console.log(pagiCassette)
        
        pageCount.each(function(index){
            var $element = $(this) 
            console.log(pageCount.length / 48 > 1)
            if(pageCount.length / 48 > 1){
                pagiCassette.find('a').text(index+1);
                
            }
   
        });
        $paginationLi.get(0).appendChild(fragment);
        
      
       
         
	},
    
	changePage : function(){
        
		this.casseteController.chagePage(pageIndex);　 //この中でpageIndexを作る
	}
    
};




$(function(){
	casseteController.load();
});








//myself.$selectedCassettes = myself.$cassettes.filter(function(item) {
//                            return $(item).hasClass('showDress');
//                        });
