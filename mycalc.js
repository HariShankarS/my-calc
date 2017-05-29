$(document).ready(function() {
  
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
        // is mobile..
      alert('Please make sure that your mobile view is in LandScape mode!')
    }  

    $("#mc").on('click',function(){
      $(".memory").attr("value","0");
      $(".capitalm").hide();
    });
    $("#mr").on('click',function(){
      val = $(".memory").attr("value");
      document.getElementById('input2').innerHTML = val;
    });
    $("#ms").on('click',function(){
      val = document.getElementById('input2').innerHTML;
      $(".memory").attr("value",val);
      $(".capitalm").show();
    });
    $("#mplus").on('click',function(){
      val = parseFloat($(".memory").attr("value"));
      val += parseFloat(document.getElementById('input2').innerHTML);
      $(".memory").attr("value",val);
    });
    $("#mminus").on('click',function(){
      val = parseFloat($(".memory").attr("value"));
      val -= parseFloat(document.getElementById('input2').innerHTML);
      $(".memory").attr("value",val);
    });
    $(".operand").on('click',function(){
      var operand = $(this).html();
      var last_btn_value = document.getElementById('last_btn').innerHTML;
      var last_btn_class = $('#last_btn').attr("class");
      var last_btn_type = $('#last_btn').attr("type");
      if (last_btn_value != operand) {
        if ((last_btn_class == "number") || (last_btn_class == "pi") || (last_btn_class == "e")) {
          if (document.getElementById('input1').innerHTML.slice(-3) == "e+0") {
            document.getElementById('input1').innerHTML = document.getElementById('input1').innerHTML.slice(0,-1);
          } // to deduct "0" from exp function
          var input2 = document.getElementById('input2').innerHTML;
          var i = input2.slice(0,1);
          if (isNaN(i)) {
            document.getElementById('input1').innerHTML += "(" + input2 + ")";
          } else {
            document.getElementById('input1').innerHTML += input2;
          }

        } //adding input2 to input 1 if last button is a num or pi or e

        var equation = document.getElementById('input1').innerHTML;
        if ((operand == "=") && (last_btn_class == "operand")) {
          var rep_array = equation.split(/\+|\%|\-|\/|\*|\^|yroot|logxBasey|mod|e+0/); // splitting the equation wherever there is a operand
          console.log(rep_array);
          var rep = rep_array[rep_array.length - 1];
          if ((rep == "0") && (document.getElementById('input1').innerHTML.slice(-3) == "e+0") ) {
            rep = document.getElementById('input2').innerHTML;
            document.getElementById('input1').innerHTML = document.getElementById('input1').innerHTML.slice(0,-1);
            document.getElementById('input1').innerHTML += document.getElementById('input2').innerHTML;
            equation += rep;
          }  // for exp function on same value in the input field
          if (rep == "") {
            rep = document.getElementById('input2').innerHTML;
            var r = rep.slice(0,1);
            if (isNaN(r)) {
              equation += "(" + rep + ")";
              document.getElementById('input1').innerHTML += "(" + document.getElementById('input2').innerHTML + ")";
            } else {
              equation += rep;
              document.getElementById('input1').innerHTML += document.getElementById('input2').innerHTML;
            }
          } // if one is calling the function on the previous value in the input2 field

        }

        if ( ( last_btn_class == "operand" ) && (operand != "=" ) ) {
          if (last_btn_class == "operand") {
          document.getElementById('input1').innerHTML = document.getElementById('input1').innerHTML.slice(0, -(last_btn_type.length));
          }
        } else {
          var equation = modify(equation);
          if (equation.indexOf("(") > -1) {
            diff = equation.match(/\(/gi).length;
            if (equation.indexOf(")") > -1) {
              diff -= equation.match(/\)/gi).length;
            }
            equation += ")".repeat(diff);            
          } // balancing brackets
          if (equation.indexOf(")(") > -1) {
            equation = equation.replace(")(",")*(")
          }
          document.getElementById('input2').innerHTML = eval(equation);
        }  // to cut the old operand and add new one


        if (last_btn_value == "=") {
          document.getElementById('input1').innerHTML = document.getElementById('input2').innerHTML;
        } // aading result to input1 and then adding operand

        if (operand != "=" ) {
          document.getElementById('input1').innerHTML += operand.replace("x<sup>y</sup>","^").replace("<sup>y</sup>√x","yroot").replace("log<sub>y</sub>x","logxBasey").replace("Exp","e+0");
        } // adding operand beside input

      }
    });
    $(".number").on('click',function(){
      var last_btn_value = document.getElementById('last_btn').innerHTML;
      var last_btn_class = $('#last_btn').attr("class");
      var last_btn_type = $('#last_btn').attr("type");
      if (last_btn_value == "=") {
        document.getElementById('input1').innerHTML = "";
        document.getElementById('input2').innerHTML = "0";
      } // clearing fields if completed, or if last button is a function

      if (last_btn_class == "number") {
        document.getElementById('input2').innerHTML += $(this).html();
      } else {
        document.getElementById('input2').innerHTML = $(this).html();        
      }
      // adding number to the previous number or else replacing


      if (last_btn_type == "method") {
        repl = document.getElementById('input1').innerHTML.split(/\+|\%|\-|\/|\*|\^|yroot|mod|logxBasey/);
        repl_value = repl[repl.length - 1];
        pre_repl_value = repl[repl.length - 2];
        if ( (pre_repl_value.slice(-1) == "(") ) {
          document.getElementById('input1').innerHTML = document.getElementById('input1').innerHTML.replace(pre_repl_value+"-"+repl_value,"");
        } else {
          document.getElementById('input1').innerHTML = document.getElementById('input1').innerHTML.replace(repl_value,"");
        }
        document.getElementById('input2').innerHTML = $(this).html();
      }

      if (last_btn_class == "bracketclose") {
        var eq = document.getElementById('input1').innerHTML;
        index = eq.indexOf("(");
        neweq = eq.slice(0,index);
        document.getElementById('input1').innerHTML = document.getElementById('input1').innerHTML.replace(eq,neweq);
      }

    });
    $(".bracketopen").on('click',function(){
      document.getElementById('input1').innerHTML += "("
      document.getElementById('input2').innerHTML = 0
    });
    
    $(".bracketclose").on('click',function(){
      var last_btn_value = document.getElementById('last_btn').innerHTML;
      var last_btn_class = $('#last_btn').attr("class");
      var last_btn_type = $('#last_btn').attr("type");
      equation = document.getElementById('input1').innerHTML;
      if (equation.indexOf("(") > -1) {
        diff = equation.match(/\(/gi).length;
        if (equation.indexOf(")") > -1) {
          diff -= equation.match(/\)/gi).length;
        }
      }
      if ( diff > 0 ){
        document.getElementById('input1').innerHTML += document.getElementById('input2').innerHTML;
        document.getElementById('input1').innerHTML += ")"
      } 
    });

    $(".pi").on('click',function(){
      var last_btn_value = document.getElementById('last_btn').innerHTML;
      var last_btn_class = $('#last_btn').attr("class");
      if (last_btn_value != "π") {
        if ((last_btn_value == "=") || ( (last_btn_class != "operand") && (last_btn_class != "number") && (last_btn_class != "bracketopen") && (last_btn_class != "bracketclose") )) {
          document.getElementById('input1').innerHTML = "";
          document.getElementById('input2').innerHTML = "0";
        }
        document.getElementById('input2').innerHTML = Math.PI;
      }
    });
    $(".e").on('click',function(){
      var last_btn_value = document.getElementById('last_btn').innerHTML;
      var last_btn_class = $('#last_btn').attr("class");
      if (last_btn_value != "e") {
        if ((last_btn_value == "=") || ( (last_btn_class != "operand") && (last_btn_class != "number") && (last_btn_class != "bracketopen") && (last_btn_class != "bracketclose") )) {
          document.getElementById('input1').innerHTML = "";
          document.getElementById('input2').innerHTML = "0";
        }
        document.getElementById('input2').innerHTML = Math.exp(1);
      }
    });
    //pi and e are similar to number

    var arr = [".sin",".cos",".tan",".sin-1",".cos-1",".tan-1",".sinh",".cosh",".tanh",".sinh-1",".cosh-1",".tanh-1",".fact",".cube",".sqr",".logXbase2",".ln",".log",".ex",".10x",".cuberoot",".sqrt",".reciproc",".abs"]
    var sel = arr.join(", ");
    $(sel).on('click',function(){
      var last_btn_value = document.getElementById('last_btn').innerHTML;
      var last_btn_class = $('#last_btn').attr("class");
      if (last_btn_value == "=") {
        document.getElementById('input1').innerHTML = document.getElementById('input2').innerHTML;
        var equation = document.getElementById('input1').innerHTML;
        var rep_array = [equation];
      } else { // if one wanted call method on the previous result
        var equation = document.getElementById('input1').innerHTML;
        var rep_array = equation.split(/\+|\%|\-|\/|\*|\^|yroot|mod|logxBasey/); // splitting the equation wherever there is a opernad
      }
      var rep = rep_array[rep_array.length - 1];
      if (rep == "") {
        rep = document.getElementById('input2').innerHTML;
        equation += document.getElementById('input2').innerHTML;
      } // if one is calling the function on the previous value in the input2 field
      if ((rep == "0") && (document.getElementById('input1').innerHTML.slice(-3) == "e+0") ) {
        rep = document.getElementById('input2').innerHTML;
        equation = equation.slice(0,-1);
        equation += document.getElementById('input2').innerHTML;
      } // for exp function 
      an = ($('input[name=angle]:checked').val()).slice(0,1);
      switch ($(this).attr("class")) {
        case "sin":
          var fnctn = "sin"+an;
          break;
        case "cos":
          var fnctn = "cos"+an;
          break;
        case "tan":
          var fnctn = "tan"+an;
          break;
        case "sin-1":
          var fnctn = "asin"+an;
          break;
        case "cos-1":
          var fnctn = "acos"+an;
          break;
        case "tan-1":
          var fnctn = "atan"+an;
          break;
        case "sinh":
          var fnctn = "sinh"+an;
          break;
        case "cosh":
          var fnctn = "cosh"+an;
          break;
        case "tanh":
          var fnctn = "tanh"+an;
          break;
        case "sinh-1":
          var fnctn = "sinhinv"+an;
          break;
        case "cosh-1":
          var fnctn = "coshinv"+an;
          break;
        case "tanh-1":
          var fnctn = "tanhinv"+an;
          break;
        case "fact":
          var fnctn = "fact";
          break;
        case "cube":
          var fnctn = "cube";
          break;
        case "sqr":
          var fnctn = "sqr";
          break;
        case "sqrt":
          var fnctn = "sqrt";
          break;
        case "logXbase2":
          var fnctn = "logXbase2";
          break;
        case "log":
          var fnctn = "log";
          break;
        case "ln":
          var fnctn = "ln";
          break;
        case "ex":
          var fnctn = "powe";
          break;
        case "10x":
          var fnctn = "powten";
          break;
        case "cuberoot":
          var fnctn = "cuberoot";
          break;
        case "reciproc":
          var fnctn = "reciproc";
          break;
        case "abs":
          var fnctn = "abs";
      }
      var equation = equation.slice(0,(equation.length - rep.length)) + fnctn + "(" + equation.slice(equation.length-rep.length) + ")";
      var input2_eq = fnctn + "(" + rep + ")";
      var input2_eq = modify(input2_eq);
      document.getElementById('input2').innerHTML = eval(input2_eq);
      document.getElementById('input1').innerHTML = equation;
    });
    
    $(".clear_all").on('click',function(){
      document.getElementById('input1').innerHTML = "";
      document.getElementById('input2').innerHTML = "0";
    });
    
    $(".back").on('click',function(){
      var last_btn_class = $('#last_btn').attr("class");
      if (last_btn_class == "number") {
        document.getElementById('input2').innerHTML = document.getElementById('input2').innerHTML.slice(0,-1);
      } 
    });

    $(".plusminus").on('click',function(){
      val = document.getElementById('input2').innerHTML;
      c = val.slice(0,1);
      if (isNaN(c)) {
        val = val.replace(c,"");
      } else {
        val = "-" + val;
      }
      document.getElementById('input2').innerHTML = val;
    });

    $("button").on('click',function(){
      val = $(this).html();
      clss = $(this).attr("class");
      typ = $(this).attr("type");
      if ( (clss == "back") && ($('#last_btn').attr("class") == "number") ){
        $('#last_btn').attr("class","number");
      } else if ( ( (clss == "back") && ($('#last_btn').attr("class") != "number") ) || (clss == "plusminus") || (clss == "mfn") ){

      } else {
        $('#last_btn').attr("class",clss);
        document.getElementById('last_btn').innerHTML = val;
        $('#last_btn').attr("type",typ);      
      }
    });

    function modify(equation) {
      var equation = equation.replace(/asind/g,"Math.asin");
      var equation = equation.replace(/acosd/g,"Math.acos");
      var equation = equation.replace(/atand/g,"Math.atan");
      var equation = equation.replace(/sinhd/g,"Math.sinh");
      var equation = equation.replace(/coshd/g,"Math.cosh");
      var equation = equation.replace(/tanhd/g,"Math.tanh");
      var equation = equation.replace(/sinhinvd/g,"Math.asinh");
      var equation = equation.replace(/coshinvd/g,"Math.acosh");
      var equation = equation.replace(/tanhinvd/g,"Math.atanh");
      var equation = equation.replace(/sinr/g,"Math.sin");
      var equation = equation.replace(/cosr/g,"Math.cos");
      var equation = equation.replace(/tanr/g,"Math.tan");
      var equation = equation.replace(/asinr/g,"Math.asin");
      var equation = equation.replace(/acosr/g,"Math.acos");
      var equation = equation.replace(/atanr/g,"Math.atan");
      var equation = equation.replace(/sinhr/g,"Math.sinh");
      var equation = equation.replace(/coshr/g,"Math.cosh");
      var equation = equation.replace(/tanhr/g,"Math.tanh");
      var equation = equation.replace(/sinhinvr/g,"Math.asinh");
      var equation = equation.replace(/coshinvr/g,"Math.acosh");
      var equation = equation.replace(/tanhinvr/g,"Math.atanh");
      var equation = equation.replace(/ln/g,"Math.log");
      var equation = equation.replace(/powe/g,"Math.exp");
      var equation = equation.replace(/abs/g,"Math.abs");
      var equation = equation.replace(/\^/g,"**");
      var equation = equation.replace(/\%/g,"*0.01*");
      var equation = equation.replace(/mod/g,"\%");
      if (equation.indexOf('yroot') > -1 ) {
        var equation = yrootfn(equation);
      }
      if (equation.indexOf('logxBasey') > -1 ) {
        var equation = logxBaseyfn(equation);
      }

      return equation;
    }

    function fact(number) {
      if (number == 0) {
        return 1;
      }
      return number * fact(number-1);
    }

    function cube(number) {
      return Math.pow(number,3);
    }

    function sqr(number) {
      return Math.pow(number,2);
    }

    function sqrt(number) {
      return Math.pow(number,1/2);
    }

    function logXbase2(number) {
      return Math.log(number)/Math.log(2);
    }

    function log(number) {
      return Math.log(number)/Math.log(10);
    }

    function powten(number) {
      return Math.pow(10,number);
    }

    function cuberoot(number) {
      return Math.pow(number,1/3);
    }

    function reciproc(number) {
      return 1/number;
    }

    function sind(number) {
      return Math.sin(number*(Math.PI/180));
    }

    function cosd(number) {
      return Math.cos(number*(Math.PI/180));
    }

    function tand(number) {
      return Math.tan(number*(Math.PI/180));
    }

    function toFixed(x) {
      if (Math.abs(x) < 1.0) {
        var e = parseInt(x.toString().split('e-')[1]);
        if (e) {
            x *= Math.pow(10,e-1);
            x = '0.' + (new Array(e)).join('0') + x.toString().substring(2);
        }
      } else {
        var e = parseInt(x.toString().split('+')[1]);
        if (e > 20) {
            e -= 20;
            x /= Math.pow(10,e);
            x += (new Array(e+1)).join('0');
        }
      }
      return x;
    }

    function yrootfn(equation) {
      eq = equation.split(/\+|\%|\-|\/|\*|\^|mod|logxBasey/);
      eq.forEach(function(a){
        if (a.indexOf("yroot") > -1) {
          if ( ((a.match(/yroot/g) || []).length) < 2) {
            front_value = a.split('yroot')[0];
            back_value = 1/(parseFloat(a.split('yroot')[1]));
            retrn = front_value + "**" + back_value;
            equation = equation.replace(a,retrn);
          } else {
            arry = a.split('yroot');
            arry.forEach(function(n,i) {
              if ( i == 0 ) {
                val = parseFloat(n);
              }
              if ( i != (arry.length - 1) ) {
                val = val**(1/(parseFloat(arry[i+1])))
              }
            });
            equation = equation.replace(a,val);
          }
        }
      });
      return equation;
    }

    function logxBaseyfn(equation) {
      eq = equation.split(/\+|\%|\-|\/|\*|\^|mod|yroot/);
      eq.forEach(function(a){
        if (a.indexOf("logxBasey") > -1) {
          if ( ((a.match(/logxBasey/g) || []).length) < 2) {
            front_value = parseFloat(a.split('logxBasey')[0]);
            back_value =  parseFloat(a.split('logxBasey')[1]);
            retrn = "Math.log(" + front_value + ")/Math.log(" + back_value + ")";
            equation = equation.replace(a,retrn);
          } else {
            arry = a.split('logxBasey');
            arry.forEach(function(n,i) {
              if ( i == 0 ) {
                val = n;
              }
              if ( i != (arry.length - 1) ) {
                val = Math.log(val)/(Math.log(parseFloat(arry[i+1])));
              }
            });
            equation = equation.replace(a,val);
          }
        }
      });
      return equation;
    }

});