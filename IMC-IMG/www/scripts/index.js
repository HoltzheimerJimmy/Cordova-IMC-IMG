function onDeviceReady() {
    var gender;
    var age;
    var size;
    var weight;
    var idealWeight;
    var imc;
    var img;
    localLoad();
    function localLoad() {
        var dataJSON = sessionStorage.getItem("data");
        var data = JSON.parse(dataJSON);
        // si il y a des data on les affiches déjà
        if (data) {
            if (data.gender == 1) {
                $('input:radio[name="gender"]').filter('[value="1"]').attr('checked', true);
                $('input:radio[name="gender"]').filter('[value="0"]').attr('checked', false);
            }
            else {
                $('input:radio[name="gender"]').filter('[value="1"]').attr('checked', false);
                $('input:radio[name="gender"]').filter('[value="0"]').attr('checked', true);
            };
            $("#age").val(data.age);
            $("#size").val(data.size);
            $("#weight").val(data.weight);
        };
    };
    function localSave(gender,age,size,weight) {
        var data = {
            gender: gender,
            age: age,
            size: size,
            weight: weight
        };
        var dataJSON = JSON.stringify(data);
        sessionStorage.setItem("data", dataJSON);//sauvegarde en local des data
    };
    $("#calcul").click(function (event) {
        //on récupere les valeurs
        gender = $('input[name=gender]:checked').val();
        age = $("#age").val();
        size = $("#size").val();
        weight = $("#weight").val();
        // on ne fais rien si il manque des val
        if (age || size || weight == "") {
            event.preventDefault();
        }
        localSave(gender, age, size, weight);//save en local des valeurs

        //calcul imc img et poids ideal
        imc = ((weight / (size * size)) * 10000).toFixed(0);
        idealWeight = ((22 / 10000) * (size * size)).toFixed(2);
        img = ((1.2 * imc) + (0.23 * age) - (10.8 * gender) - 5.4).toFixed(0);
        result();
    });
    function result() {
        $("#result-imc").removeClass();
        $("#result-imc").html("<strong>IMC : </strong>" + imc);
        if (imc <= 16) {
            $("#result-imc").addClass("bg-danger text-white");
        }
        else if (imc >= 17 && imc <= 18) {
            $("#result-imc").addClass("bg-warning  text-white col-xs-12");
        }
        else if (imc >= 19 && imc <= 25) {
            $("#result-imc").addClass("bg-success  text-white col-xs-12");
        }
        else if (imc >= 26 && imc <= 30) {
            $("#result-imc").addClass("bg-warning text-white col-xs-12");
        }
        else if (imc >= 31 && imc <= 35) {
            $("#result-imc").addClass("bg-warning-plus text-white col-xs-12");
        }
        else if (imc >= 36 && imc <= 40) {
            $("#result-imc").addClass("bg-danger text-white col-xs-12");
        }
        else {
            $("#result-imc").addClass("bg-inverse  text-white");
        }
        $("#result-img").removeClass();
        $("#result-img").html("<strong>IMG : </strong>" + img);
        if (gender == 1) {
                if (img < 15) {
                    $("#result-img").addClass("bg-warning text-white col-xs-12");
                }
                else if (img >= 15 && img <= 20) {
                    $("#result-img").addClass("bg-success text-white col-xs-12");
                }
                else {
                    $("#result-img").addClass("bg-warning text-white col-xs-12");
                }
            }
        else{ 
                if (img < 25) {
                    $("#result-img").addClass("bg-warning text-white col-xs-12");
                }
                else if (img >= 25 && img <= 30) {
                    $("#result-img").addClass("bg-success text-white col-xs-12");
                }
                else {
                    $("#result-img").addClass("bg-warning text-white col-xs-12");
                }
            }
        $("#result-ideal").html("<p class='col-xs-10'><strong>Poids idéal : </strong>" + idealWeight + " Kg</p><p class='col-xs-2'><button id='info-btn' onclick='info()' type='button' class='btn btn-default btn-sm'><span class='glyphicon glyphicon-question-sign' aria-hidden='true'></span></button></p>");

    };

};
document.addEventListener('deviceready', onDeviceReady.bind(this), false);