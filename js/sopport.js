function getPosTop(i,j){
	return 102*i+5;
}
function getPosLeft(i,j){
	return 102*j+5;
}
function getBackgroundColorByNumber(number){
	switch(number){
		case 2: return '#eee4da';break;
		case 4: return '#ede0c8';break;
		case 8: return '#f2b129';break;
		case 16: return '#f59e27';break;
		case 32: return '#f79e5f';break;
		case 64: return '#edcf72';break;
		case 128: return '#edcc61';break;
		case 256: return '#cc99cc';break;
		case 512: return '#33b5ff';break;
		case 1024: return '#0098cc';break;
		case 2048: return '#a6c';break;
		case 4096: return '#e5f';break;
		default: return '000000';break;
	}
}

function nospace(board){
	for(var i=0;i<board.length;i++){
		for(var j=0;j<board[i].length;j++)
			if(board[i][j]==0){
				return false;
			}
	}
	return true;
}

function canMoveLeft(board){
	for(var i=0;i<4;i++){
		for(var j=1;j<4;j++)
			if(board[i][j]!=0)
				if(board[i][j-1]==0||board[i][j]==board[i][j-1])
					return true;
	}
	return false;
}

function canMoveRight(board){
	for(var i=0;i<4;i++){
		for(var j=2;j>-1;j--)
			if(board[i][j]!=0)
				if(board[i][j+1]==0||board[i][j]==board[i][j+1])
					return true;
	}
	return false;
}

function canMoveUp(board){
	for(var j=0;j<4;j++){
		for(var i=1;i<4;i++){
			if(board[i][j]!=0){
				if(board[i-1][j]==0||board[i][j]==board[i-1][j])
					return true;
			}
		}
	}
	return false;
}

function canMoveDown(board){
	for(var j=0;j<4;j++){
		for(var i=2;i>-1;i--){
			if(board[i][j]!=0){
				if(board[i+1][j]==0||board[i][j]==board[i+1][j])
					return true;
			}
		}
	}
	return false;
}

function noBlockHorizontal(row,col1,col2,board){
	for(var i=col1+1;i<col2;i++){
		if(board[row][i]!=0){
			return false;
		}
	}
	return true;
}

function noBlockVertical(line,col1,col2,board){
	for(var i=col1+1;i<col2;i++){
		if(board[i][line]!=0){
			return false;
		}
	}
	return true;
}

function nomove(board){
	if(canMoveLeft(board)){
		return false;
	}
	return true;
}
