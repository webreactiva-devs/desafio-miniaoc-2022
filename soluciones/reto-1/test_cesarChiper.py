import unittest
import cesarChiper

class TestMyModule (unittest.TestCase):
    def test1(self):
        self.assertEqual(cesarChiper.decodedMsg('AAAAA',6),'GGGGG')

    def test0(self):
        self.assertEqual(cesarChiper.decodedMsg('AAAAAA',5),'FFFFFF')
        
    
        
    def test2(self):
        self.assertEqual(cesarChiper.decodedMsg('AAAAA',7),'HHHHH')
       
    
    def test3(self):
        self.assertEqual(cesarChiper.decodedMsg('AAAAA',8),'IIIII')       
if __name__ == "__main__":
    
    unittest.main()