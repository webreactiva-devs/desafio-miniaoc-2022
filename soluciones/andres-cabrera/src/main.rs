fn main() {
    println!("{}", descifra_izq("NVI EPVI YZ BVUOZGPBVOSZ", 5));
}
const ABC: &str= "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

fn descifra_izq(text: &str, positions: usize) -> String {
    let ret = descifra(text, 26-positions);

    return ret;
}
fn descifra(text: &str, positions: usize) -> String {
    text.to_uppercase().chars().map(|c: char| {
        let i = ABC.find(c);
        if i != None {
            let len = ABC.len();

            let mut new_index: i32 = i.unwrap() as i32 - positions as i32;
            
            if new_index < 0 && new_index < len as i32{
                new_index = len as i32 - (new_index*-1);
            }
            

            ABC.chars().nth( new_index as usize).unwrap()
        
    }
    else {
        c
    }
    }).collect()
}

#[cfg(test)]
mod test {

    use super::*;

    #[test]
    fn test_one_letter() {
        assert_eq!("A", descifra("d", 3));
    }

    #[test]
    fn test_one_word() {
        assert_eq!("MALANDRINER", descifra("znynaqevare", 13))
    }

    #[test]
    fn test_one_phrase() {
        assert_eq!("SAN JUAN DE GAZTELUGATXE", descifra("NVI EPVI YZ BVUOZGPBVOSZ", 21))
    }

    #[test]
    fn test_one_phrase_izq() {
        assert_eq!("SAN JUAN DE GAZTELUGATXE", descifra_izq("NVI EPVI YZ BVUOZGPBVOSZ", 5))
    }

}
