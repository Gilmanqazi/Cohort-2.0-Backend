=>UI Layer
 => UI dikhana user ko or navigate karna

 1) src me routes bana na hai React-router-dom install karke  usme import karenge hum createBrowserRouter pr phir router constant me ek array ot obj banayege jime path aayenga /login element login.jsx  iss router ko app.jsx me import karna hai routerProvideror router   or return karna hai <RouterProvider router={router}/>
 2) phir src me features folder usme auth uske andar componets or pages pages me login/register.jsx honge 

 3) features me shared folder or usme globle.scss  isme groble styling likhna hai app.js me isse import karna hai import ../folder/folder/filename   npm i saas

 4) auth folder me style folder ban na hai form.scss jo auth ki styling karengi 

5) AuthPrivrder ke ander hum RouterProvider ko wrap karenge app.jsx me


=> Hook
 =>manage karna State and Api layer ko

=>State  Data ko Store karti hai 
 => state manage karna
   =>Loading 
   =>User
   =>post list 
   =>errr

=>Api
 => Backend se communicate karna

 ye ek dusre ke kam me interfare nhi karte


