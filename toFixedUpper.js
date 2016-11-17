Number.prototype.toFixed = function (dec){
	var angka = this;
	var pembagi = Math.pow(10,dec);
	var hasil = Math.round(angka*pembagi)/pembagi;
	return hasil;
}
