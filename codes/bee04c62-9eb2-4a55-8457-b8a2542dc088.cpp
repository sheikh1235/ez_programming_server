#include<iostream>
using namespace std;

int main()
{
  	// If, Else If includeing nested If
	if(true)
	{
		cout << "Inside If";
      	if(true){
          cout << "If";
          if(true){
            cout << "Nested If";
            if(false)
            {
              cout << "Nested Nested If";
            }
            cout << "Nested If"; 
          }
        }
	}
	else if (false)
	{
		cout << "Inside Else If";
        
	}	
  
  	cout << "Hello World";
 }