var board=new Array();
var score=0;

$(document).ready(function() {
	newgame();
})

function newgame(){
	init();//初始化
	generateOneNumber();//随机生成一个数字
	generateOneNumber();//随机生成第二个数字
	score=0
}
function init(){
	for (var i = 0; i < 4; i++) {
		board[i]=new Array();
		for (var j = 0; j <4; j++){
			var cell=$("#cell_"+i+"_"+j);
			cell.css({'top':getPosTop(i,j),'left':getPosLeft(i,j)});
			board[i][j]=0;

		}
	}
	updateBoardView();
}
function updateBoardView(){
	$(".number_cell").remove();
	for (var i = 0; i < 4; i++) {
		for (var j = 0; j < 4; j++) {
			$(".mainBox").append("<div class='number_cell' id='number_cell_"+i+'_'+j+"'></div>");
			var number_cell=$("#number_cell_"+i+'_'+j);
			if(board[i][j]==0){
				number_cell.css({'width':0,'height':0,'top':getPosTop(i,j)+50,'left':getPosLeft(i,j)+50});
			}else{
				number_cell.css({'width':'100px','height':'100px','top':getPosTop(i,j),'left':getPosLeft(i,j)});
				number_cell.css('background',getBackgroundColorByNumber(board[i][j]));
				number_cell.text(board[i][j]);
			}
		}
	}
}
function generateOneNumber(){
	if(nospace(board)){
		return false;
	}
	//随机一个位置
	var randx=parseInt(Math.floor(Math.random()*4));
	var randy=parseInt(Math.floor(Math.random()*4));
	while(true){
		if (board[randx][randy]!=0) {
			randx=parseInt(Math.floor(Math.random()*4));
	        randy=parseInt(Math.floor(Math.random()*4));
		}else{
			break;
		}
	}
	//随机一个数字
	var randomNum=Math.random()<0.4? 4:2;
	board[randx][randy]=randomNum;
	showNumAnimation(randx,randy,randomNum);
	return true;
}

function getEmptyDiv(){
	var div=[];
	$('.number_cell').each(function(index,element){
		if(element.innerText==''){
			div.push(element);
		}
	})
	return div;
}

function isgameover(){
	if(nospace(board)&&nomove(board)){
		gameover();
	}
}
function gameover(){
	//alert('gameover');
}

$(document).keydown(function(event){
	switch(event.keyCode){
		case 37://left
			if(moveLeft()){
				generateOneNumber();
				isgameover();
			}
			break;
		case 38://up
			if(moveUp()){
				generateOneNumber();
				isgameover();
			}
			break;
		case 39://right
			if(moveRight()){
				generateOneNumber();
				isgameover();
			}
			break;
		case 40://down
			if(moveDown()){
				generateOneNumber();
				isgameover();
			}
			break;
	}
})

function moveLeft(){
	if(!canMoveLeft(board))
		return false;
		
	for(var i=0;i<4;i++){
		for(var j=1;j<4;j++){
			if(board[i][j]!=0){
				for(var k=0;k<j;k++){
					if(board[i][k]==0&&noBlockHorizontal(i,k,j,board)){
						//move
						showMoveAnimation(i,j,i,k);
						board[i][k]=board[i][j];
						board[i][j]=0;
						continue;
					}
					else if(board[i][k]==board[i][j]&&noBlockHorizontal(i,k,j,board)){
						//move
						showMoveAnimation(i,j,i,k);
						//add
						board[i][k]+=board[i][j];
						board[i][j]=0;
						//add score
						score+=board[i][k];
						updateScore(score);
						continue;
					}
				}
			}
		}
	}
	setTimeout('updateBoardView()',200);
	return true;
}
function moveRight(){
	if(!canMoveRight(board))
		return false;
		
	for(var i=0;i<4;i++){
		for(var j=3;j>-1;j--){
			if(board[i][j]!=0){
				for(var k=4;k>j;k--){
					if(board[i][k]==0&&noBlockHorizontal(i,j,k,board)){
						//move
						showMoveAnimation(i,j,i,k);
						board[i][k]=board[i][j];
						board[i][j]=0;
						continue;
					}
					else if(board[i][k]==board[i][j]&&noBlockHorizontal(i,j,k,board)){
						//move
						showMoveAnimation(i,j,i,k);
						//add
						board[i][k]+=board[i][j];
						board[i][j]=0;
						//add score
						score+=board[i][k];
						updateScore(score);
						continue;
					}
				}
			}
		}
	}
	setTimeout('updateBoardView()',200);
	return true;
}
function moveUp(){
	if(!canMoveUp(board))
		return false;
	for(var j=0;j<4;j++){
		for(var i=1;i<4;i++){
			if(board[i][j]!=0){
				for(var k=0;k<i;k++){
					if(board[k][j]==0&&noBlockVertical(j,k,i,board)){
						//move
						console.log('123');
						showMoveAnimation(i,j,k,j);
						board[k][j]=board[i][j];
						board[i][j]=0;
						continue;
					}
					else if(board[k][j]==board[i][j]&&noBlockVertical(j,k,i,board)){
						//move
						showMoveAnimation(i,j,k,j);
						//add
						board[k][j]+=board[i][j];
						board[i][j]=0;
						//add score
						score+=board[k][j];
						updateScore(score);
						continue;
						console.log('123');
					}
				}
			}
		}
	}
		
	setTimeout('updateBoardView()',200);
	return true;
}
function moveDown(){
	if( !canMoveDown( board ) )
        return false;

    //moveDown
    for( var j = 0 ; j < 4 ; j ++ )
        for( var i = 2 ; i >= 0 ; i -- ){
            if( board[i][j] != 0 ){
                for( var k = 3 ; k > i ; k -- ){

                    if( board[k][j] == 0 && noBlockVertical( j , i , k , board ) ){
                        //move
                        showMoveAnimation( i , j , k , j );
                        board[k][j] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }
                    else if( board[k][j] == board[i][j] && noBlockVertical( j , i , k , board ) ){
                        //move
                        showMoveAnimation( i , j , k , j );
                        //add
                        board[k][j] += board[i][j];
                        board[i][j] = 0;
                        //add score
                        score += board[k][j];
                        updateScore( score );
                        continue;
                    }
                }
            }
        }

    setTimeout("updateBoardView()",200);
    return true;
}
