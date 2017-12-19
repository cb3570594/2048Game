function showNumAnimation(i,j,num){
	var number_cell=$("#number_cell_"+i+'_'+j);
	number_cell.css('background-color',getBackgroundColorByNumber(num));
	number_cell.text(num);
	number_cell.animate({
		'width':'100px',
		'height':'100px',
		'top':getPosTop(i,j),
		'left':getPosLeft(i,j)
	},200)
}

function showMoveAnimation(fromx,fromy,tox,toy){
	var numberCell=$("#number_cell_"+fromx+'_'+fromy);
	numberCell.animate({
		top:getPosTop(tox,toy),
		left:getPosLeft(tox,toy)
	},200);
}
function updateScore(score){
	$('.score').text(score);
}
