  var LEIHAUOLI = LEIHAUOLI || {};
    LEIHAUOLI.PAGE2 = {};
    LEIHAUOLI.PAGE2.Pagination = {
        init : function(){
            this.setParameters();
            this.bindEvent(); 
        },
        
        setParameters : function(){　
            this.$paginationContainer = $('.pagination-container') 
            this.leftBtn = $('.leftBtn')
            this.rightBtn = $('.rightBtn')
            this.paginationLi = this.$paginationContainer.find('li');
            this.liLength = this.paginationLi.length;
            this.lastPage = this.liLength - 1;
            this.currentIndex = 0; 
        },
        
        bindEvent: function(){
            var self = this;
            this.rightBtn.on('click',this.setRightBtn.bind(this)); 
            this.leftBtn.on('click',this.setLeftBtn.bind(this));
            this.paginationLi.each(function(index){
                var $elemens = $(this);
                $elemens.on('click',function(event){
                    event.preventDefault();
                    self.currentIndex = index;
                    self.setPaginationMove();
                    self.setArrow();
                 });
            });
        
        },
        
        setRightBtn : function(event){
            event.preventDefault();
            if(this.currentIndex == this.lastPage){
                return;   
            }
            this.currentIndex++;
            this.setPaginationMove();
            this.setArrow();    
        },
        
        setLeftBtn : function(event){
            event.preventDefault();
            if(this.currentIndex == 0){
                return;   
            }
            this.currentIndex--;
            this.setPaginationMove();
            this.setArrow();    
        },
        
        setArrow : function(){
            if(this.currentIndex == this.lastPage){
                this.rightBtn.addClass('disabled');           
            }else{
                this.rightBtn.removeClass('disabled'); 
            }
            
            if(this.currentIndex == 0){
                this.leftBtn.addClass('disabled');           
            }else{
                this.leftBtn.removeClass('disabled'); 
            } 
        },
     
        setPaginationMove : function(){
            var self = this;
            this.paginationLi.each(function(index){
                var $elemens = $(this);
                if(index == self.currentIndex){
                    $elemens.addClass('active');
                }else{
                    $elemens.removeClass('active');   
                }
                    
                   
            });    
        }
        
      
    };
    
 
     $(function(){
        LEIHAUOLI.PAGE2.Pagination.init();
    });



