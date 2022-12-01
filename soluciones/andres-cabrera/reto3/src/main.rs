
fn main() {
    let empty_character = ' ';
    let fill_character = '*';
    let mut character = vec![vec![empty_character; 7]; 7];

    for i in 0..7 {
        for j in 0..7 {
            let check = get_result_from_api(i,j);
            
            if check {
                character[i][j] = fill_character;
            }
        }
    }
        
        

    
    print_vector(character);
}

fn get_result_from_api(row: usize, col: usize) -> bool {

    //let cadena2 = "{ \"checkpoint\": \"{0,6}\" }";
    let cadena_start = "{ \"checkpoint\": \"{";
    let cadena_end   = "}\", \"name\":\"Andres\" }";
    let cadena_final = format!("{}{},{}{}", cadena_start, row,col,cadena_end);
    let client = reqwest::blocking::Client::new();
    let res = client.post("https://donde-esta-supercoco.vercel.app/api/reto/37P1Cz12P3")
    .body(cadena_final)
    .send();

    //let test = res.ok().unwrap().text();
    if res.unwrap().status().is_success() {
        return true;
    }
    /*let test = res.ok().unwrap().text();
    println!("{:#?}", test);*/
    return false;
}

fn print_vector(character: Vec<Vec<char>>) {
    for i in 0..7 {
        for j in 0..7 {
            let printing_i = 6 - i;
            print!("{}", character[j][printing_i]);
        }
        println!();
    }
}