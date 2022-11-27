
    
    
    var str ='NVI EPVI YZ BVUOZGPBVOSZ';
    var str2 = '';

    

    for (i=0; i<str.length; i++) {
        

    let ascii= str.charCodeAt(i);
    

        if (ascii==32) {
            let incremento = 32;
            let desco= String.fromCharCode(incremento); 
            str2 =str2.concat(desco); 
        }

       
        
        
        if ((ascii<=85) && (ascii!=32)) {
            
            let incremento =ascii+5;
            let desco= String.fromCharCode(incremento); 
            str2= str2.concat(desco); 
        } 
        

        if (ascii==86) {
            let incremento =65;
            let desco= String.fromCharCode(incremento); 
           
            str2 = str2.concat(desco);  

        }

        if (ascii==87){
            let uncremento= 66;
            let desco= String.fromCharCode(incremento); 
            str2=str2.concat(desco);  
        }

        if (ascii==88) {
            let incremento =67;
            let desco= String.fromCharCode(incremento); 
            str2=str2.concat(desco);  

        }

        if (ascii==89) {
                let incremento =68;
                let desco= String.fromCharCode(incremento); 
                str2=str2.concat(desco);  
    
        }

        if (ascii==90) {
                let incremento =69;
                let desco= String.fromCharCode(incremento); 
                str2=str2.concat(desco);  
        
        }
    
    
    
     
     }

    console.log (str2);
    

   



  

   




    





