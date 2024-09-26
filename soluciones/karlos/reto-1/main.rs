fn main() {
    println!("{}",decode("NVI EPVI YZ BVUOZGPBVOSZ"));
}

fn decode(word:&str)->String{
    word.chars().map(|c|{
        desplazamiento(c)
    }).collect()
}

fn desplazamiento(caracter:char)->char{
    let pasos = 5;
    let abc:&str = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let len = abc.chars().count() as i32;

    if abc.find(caracter) == None{
        return caracter
    }

    let index:i32 = abc.find(caracter).unwrap() as i32;
    let mut new_index = index + pasos;
    if new_index > len - 1{
        new_index -= len;
    }
    let new_caracter = abc.chars().nth(new_index as usize).unwrap();
    
    return new_caracter;
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn it_works() {
        let result = desplazamiento('E');
        assert_eq!(result, 'J');
    }

    #[test]
    fn decode_test() {
        let result = decode("ABC");
        assert_eq!(result, "FGH");
    }

    #[test]
    fn border_test() {
        let result = desplazamiento('Z');
        assert_eq!(result, 'E');
    }

    #[test]
    fn espace_test() {
        let result = desplazamiento(' ');
        assert_eq!(result, ' ');
    }
}
