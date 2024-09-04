using Re_Gift.Server.Helpers;

namespace Regift_testProject
{
    public class UnitTest1
    {

        


        [Fact]
        public void Test1()
        {

          var s =  EnumsHelp.GetCompanyName(1);

            Assert.NotEqual(s, "Elgiganten");

            

        }

        [Fact]
        public void Test2()
        {

            var s = EnumsHelp.GetCompanyName(1);

            Assert.Equal(s, "Adidas");



        }




    }
}