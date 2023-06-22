function ValidateTemperatureCalculatorForm()
{
    _cmnRemoveAllErrorMessage();
    
    var inputTemperature = document.getElementById("inputTemperature").value;
    if(inputTemperature == "" || isNaN(inputTemperature) || Number(inputTemperature) <= 0)
    {
        _cmnShowErrorMessageBottomOfTheInputField("inputTemperature", "Enter valid temperature.");
        return false;
    }
    return true;
}

function ResetTemperatureCalculator()
{
    document.getElementById("inputTemperature").value = "";
    document.getElementById("toUnit").value = "Fahrenheit";
    document.getElementById("fromUnit").value = "Celsius";
    document.getElementById("outputTemperature").value = "";

    document.getElementById("temperatureResult").innerHTML = "";
    document.getElementById("temperatureFormula").innerHTML = "";
        
    _cmnRemoveAllErrorMessage();

    _cmnHideElement("OutputResult");
    _cmnShowElement("OutputInfo", "flex");
}

function ReverseTemperatureCalculator()
{
    var selectElement1 = document.getElementById("toUnit").value = "Celsius";
    var selectElement2 = document.getElementById("fromUnit").value = "Fahrenheit";

    var parentElement = inputElement1.parentElement;
    parentElement.insertBefore(selectElement2, selectElement1);
}

function CalculateTemperature()
{
    if(ValidateTemperatureCalculatorForm())
    {
        var fromUnit = document.getElementById("fromUnit").value;
        var toUnit = document.getElementById("toUnit").value;
        var inputTemperature = document.getElementById("inputTemperature").value;
        var outputTemperature = document.getElementById("outputTemperature");
        
        ShowFormula(fromUnit, toUnit);
        
        var result = ConverterTemperature(inputTemperature,  fromUnit,  toUnit);
        
        outputTemperature.value = result.toFixed(2);
        document.getElementById("temperatureResult").innerHTML = formatResult(inputTemperature,result,fromUnit,toUnit);

        //result div show
        _cmnHideElement("OutputInfo");
        _cmnShowElement("OutputResult", "flex");
    }
}

function ConverterTemperature(inputTemperature,  fromUnit,  toUnit)
{
    fromUnit = fromUnit.toLowerCase();
    toUnit = toUnit.toLowerCase();
    inputTemperature = Number(inputTemperature);
    var outputTemperature;

    if (fromUnit == "celsius")
    {
        if (toUnit == "fahrenheit")
        {
            outputTemperature = (inputTemperature * (9 / 5) + 32);
        }else{
            outputTemperature = inputTemperature;
        }
    }
    else if (fromUnit == "fahrenheit")
    {
        if (toUnit == "celsius")
        {
            outputTemperature = (inputTemperature - 32) * 5/9;
        }else{
            outputTemperature = inputTemperature;
        }
    }
    return outputTemperature;
}

function ShowFormula(fromUnit,toUnit)
{
    const formulaJSONobj = JSON.parse(formula);
    for(var i = 0; i <formulaJSONobj.conversions.length; i++)
    {            
        if(
            formulaJSONobj.conversions[i].from.toLowerCase() == fromUnit.toLowerCase() 
            && formulaJSONobj.conversions[i].to.toLowerCase() == toUnit.toLowerCase()
            )
        {
            document.getElementById("temperatureFormula").innerHTML = formulaJSONobj.conversions[i].formula;
        }
    }
}

function formatResult(inputTemperature,outputTemperature,fromUnit,toUnit){

    if(fromUnit.toLowerCase() == 'celsius'){
        fromUnit = '℃';
    }else if(fromUnit.toLowerCase() == 'fahrenheit'){
        fromUnit = '℉'
    }

    if(toUnit.toLowerCase() == 'celsius'){
        toUnit = '℃';
    }else if(toUnit.toLowerCase() == 'fahrenheit'){
        toUnit = '℉'
    }

    return inputTemperature + fromUnit + ' = ' + outputTemperature + toUnit;
}