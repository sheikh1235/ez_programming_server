#include<iostream>
using namespace std;

int main()
{
  	bool flag = false;
  	int a,b,sum;
  	cin >> a >> b;
  	sum = a + b;
  	cout << "sum -> " <</*Comments*/ sum<<endl;
  
  	if(sum > 50)
  	{
  		cout<<"Total sum is greater than 50";
    }
    else if(sum < 50)
    {
        cout<<"Total sum is lesser than 50";
    }
    else
    {
     	cout<<"Total sum is equals to 50";
    }
 }