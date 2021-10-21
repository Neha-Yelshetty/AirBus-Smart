//function GlobalErrorHandling() {

//    window.onerror = function (errorMsg, url, lineNumber) {

//        bsAlert("There was some error in processing .Please try again");
//        ShowProgressBar(false);
//        DisableEnableButtonsDuringProcess(false);
//        console.log('Error: ' + errorMsg + ' Script: ' + url + ' Line: ' + lineNumber);

//    }
//}
var smart = window.smart || {};

function fillDatesOnMonth(el, monthVal, yyyy) {
    var dd = $(el).val();
    $(el).html("");
    if (monthVal == 1 || monthVal == 3 || monthVal == 5 || monthVal == 7 || monthVal == 8 || monthVal == 10 || monthVal == 12) {
        var html = '';
        for (var i = 1, len = 31; i < len + 1; ++i) {
            html += '<option value="' + i + '">' + i + '</option>';
        }
        $(el).append(html);
    }

    if (monthVal == 4 || monthVal == 6 || monthVal == 9 || monthVal == 11) {
        var html = '';
        for (var i = 1, len = 30; i < len + 1; ++i) {
            html += '<option value="' + i + '">' + i + '</option>';
        }
        $(el).append(html);
    }

    if (monthVal == 2) {
        if (yyyy % 4 == 0)
            var len = 29;
        else
            var len = 28;
        var html = '';
        for (var i = 1; i < len + 1; ++i) {
            html += '<option value="' + i + '">' + i + '</option>';
        }
        $(el).append(html);
    }
    $(el).val(dd);
}

function fillDates(el) {
    var today = new Date();
    var monthVal = today.getMonth() + 1;
    var yyyy = today.getFullYear();
    $(el).html("");
    if (monthVal == 1 || monthVal == 3 || monthVal == 5 || monthVal == 7 || monthVal == 8 || monthVal == 10 || monthVal == 12) {
        var html = '';
        for (var i = 1, len = 31; i < len + 1; ++i) {
            html += '<option value="' + i + '">' + i + '</option>';
        }
        $(el).append(html);
    }

    if (monthVal == 4 || monthVal == 6 || monthVal == 9 || monthVal == 11) {
        var html = '';
        for (var i = 1, len = 30; i < len + 1; ++i) {
            html += '<option value="' + i + '">' + i + '</option>';
        }
        $(el).append(html);
    }

    if (monthVal == 2) {        
        if (yyyy % 4 == 0)
            var len = 29;
        else
            var len = 28;
        var html = '';
        for (var i = 1; i < len + 1; ++i) {
            html += '<option value="' + i + '">' + i + '</option>';
        }
        $(el).append(html);
    }
}

function fillMonths(el) {
    var options = '<option value="1">Jan</option>' +
    '<option value="2">Feb</option>' +
    '<option value="3">Mar</option>' +
    '<option value="4">Apr</option>' +
    '<option value="5">May</option>' +
    '<option value="6">Jun</option>' +
    '<option value="7">Jul</option>' +
    '<option value="8">Aug</option>' +
    '<option value="9">Sep</option>' +
    '<option value="10">Oct</option>' +
    '<option value="11">Nov</option>' +
    '<option value="12">Dec</option>';
    $(el).html(options);
}

function fillYears(el) {
    var today = new Date();
    var yyyy = today.getFullYear();
    var options = '<option value="' + parseInt(yyyy - 2) + '">' + parseInt(yyyy - 2) + '</option>' + '<option value="' + parseInt(yyyy - 1) + '">' + parseInt(yyyy - 1) + '</option>' +
    '<option value="' + yyyy + '">' + yyyy + '</option>' +
    '<option value="' + parseInt(yyyy + 1) + '">' + parseInt(yyyy + 1) + '</option>';
    $(el).html(options);
}

function fillhours(el, hoursFormat) {
    if (typeof hoursFormat == 'undefined') {
        hoursFormat = 13;
        var startingHour = 1;
    } else {
        var startingHour = 0;
    }
    var optionsHR = '';
    var tempHR = '';
    for (var i = startingHour; i < hoursFormat; i++) {
        if (i < 10)
            tempHR = '0' + i;
        else
            tempHR = i;
        optionsHR += '<option value="' + i + '">';
        optionsHR += tempHR + '</option>';
    }
    $(el).html(optionsHR);
}
function fillhours2(el, noOfHrs, startingHour) {
    if (typeof noOfHrs == 'undefined') {
        noOfHrs = 24;        
    }
    if (typeof startingHour == 'undefined') {        
        startingHour = 1;
    }
    var optionsHR = '';
    var tempHR = '';
    for (var i = startingHour; i < noOfHrs; i++) {
        if (i < 10)
            tempHR = '0' + i;
        else
            tempHR = i;
        optionsHR += '<option value="' + i + '">';
        optionsHR += tempHR + '</option>';
    }
    $(el).html(optionsHR);
}
function fillMinutes(el) {
    var optionsMin = '';
    var tempMin = '';
    for (var i = 0; i < 60; i++) {
        if (i < 10)
            tempMin = '0' + i;
        else
            tempMin = i;
        optionsMin += '<option value="' + tempMin + '">';
        optionsMin += tempMin + '</option>';
    }
    $(el).html(optionsMin);
}
function fillMinutes2(el, noOfMins, startingMin) {
    if (typeof noOfMins == 'undefined') {
        noOfMins = 60;
    }
    if (typeof startingMin == 'undefined') {
        startingMin = 1;
    }
    var optionsHR = '';
    var tempHR = '';
    for (var i = startingMin; i < noOfMins; i++) {
        if (i < 10)
            tempHR = '0' + i;
        else
            tempHR = i;
        optionsHR += '<option value="' + i + '">';
        optionsHR += tempHR + '</option>';
    }
    $(el).html(optionsHR);
}

function getHours12HrFmt(hours) {
    hours = hours % 24;
    if (hours > 12) {
        hours -= 12;
    } else if (hours === 0) {
        hours = 12;
    }
    return hours;
}

function getMeridiem(hours) {
    hours = hours % 24;
    var meridiem = 'AM';
    if (hours >= 12) {
        meridiem = 'PM';
    } else if (hours === 0) {
        meridiem = 'AM';
    }
    return meridiem;
}

function NumofTimeCharoccurinString(str, letter) {

    indexes = [];

    $.each(str.split(''), function (i, v) {
        if (v === letter) indexes.push(i);
    });
    return indexes;
}
function findNumOfTimesRowOccur(arr) {
    var a = [], b = [], prev;

    arr.sort();
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] !== prev) {
            a.push(arr[i]);
            b.push(1);
        } else {
            b[b.length - 1]++;
        }
        prev = arr[i];
    }

    return [b];
}

function ShowProgressBar(bool) {
    if (bool) {
        $("#divProgressBar").attr("style", "display:block");

    } else {
        $("#divProgressBar").attr("style", "display:none");

    }
}

function validName(custName) {
    if (custName == "" || custName == null)
        return false;
    else
        return true;
}

function validEmail(strEmail) {
    var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    return emailReg.test(strEmail);
}

function validIndianMobile(strMobile) {
    var validMobileNums = new Array(7, 8, 9);
    if (strMobile == "" || strMobile == null || strMobile.length!=10)
        return false;
    else
        return true;
    //if ($.inArray(parseInt(strMobile.charAt(0)), validMobileNums) > -1) { return true; }
    //else { return false; }
}

function UpdateIndexForChosen() {
    var el = $('a.chosen-single');    
    $.each(el, function (index, value) {
        var indexVal = $(el[index]).parent().prev().attr('index-group');
        $(el[index]).parent().prev().removeAttr('index-group');
        $(el[index]).attr('index-group', indexVal);
        var indexTab = $(el[index]).parent().prev().attr('index-tab');
        $(el[index]).parent().prev().removeAttr('index-tab');
        $(el[index]).attr('index-tab', indexTab);        
    });
}

function getSeatType(seatTypeNo, IsAC) {
    var seatType = '';
    seatTypeNo = parseInt(seatTypeNo);
    switch(seatTypeNo){
        case 1: seatType='SIT';break;
        case 2: seatType='SLP';break;
        case 3: seatType = 'SLM'; break;
        case 4: seatType = 'SIT'; IsAC = false; break;
    }
    if (IsAC)
        seatType += 'AC';
    else
        seatType += 'NAC';

    return seatType;
}

function getTripDetails(tripID, searchResults) {
    for (var searchedTrip in searchResults) {
        if (searchResults[searchedTrip].TripID == tripID)
            return searchResults[searchedTrip];                 
     }
}

function FocusFirstInput(modal, selEl) {
    $(modal).on('shown.bs.modal', function () {
        if(typeof selEl != 'undefined' && selEl != null){
            if($(selEl).hasClass('chosen-select'))
                $(this).find(selEl + '_chosen a.chosen-single').focus();
            else
                $(this).find(selEl).focus();
        }        
        else{
            $(this).find(".modal-body :input:visible").first().focus();
        }            
    });
}

function getMonthNo(Month) {
    var no = 0;
    Month = Month.toLowerCase();
    switch (Month) {
        case 'jan': no = 1; break;
        case 'feb': no = 2; break;
        case 'mar': no = 3; break;
        case 'apr': no = 4; break;
        case 'may': no = 5; break;
        case 'jun': no = 6; break;
        case 'jul': no = 7; break;
        case 'aug': no = 8; break;
        case 'sep': no = 9; break;
        case 'oct': no = 10; break;
        case 'nov': no = 11; break;
        case 'dec': no = 12; break;
    }
    return no;
}

function ShowProgressBarModify(bool) {
    if (bool) {
        $("#divProgressModify").show();
    } else {
        $("#divProgressModify").hide();
    }    
}

function ShowProgressBarTripSch(bool) {
    if (bool) {
        $("#divProgressTripSch").show();
    } else {
        $("#divProgressTripSch").hide();
    }
}

function ShowProgressBarModal(bool, el) {
    if (bool) {
        if (typeof el != 'undefined') {
            $(el).hide();
        }
        $("#divProgressModal").show();        
    } else {
        $("#divProgressModal").hide();
        if (typeof el != 'undefined') {
            $(el).show();
        }
    }    
}


function DisableEnableButtonsDuringProcess(bool) {
    if (bool) {

        $("#a-left-buttons").find("*").prop("disabled", true);
        $("#rightpanelButtons").find("*").prop("disabled", true);
        

    }
    else {
        $("#a-left-buttons").find("*").prop("disabled", false);
        $("#rightpanelButtons").find("*").prop("disabled", false);
        SetControlVisibiltyBasedOnRights();
        
    }
    }




function initMobileCount(inputEl, displayEl) {
    var countOfCharacters = $(inputEl).val().length;
    $(displayEl).text(countOfCharacters);
    $(inputEl).keyup(function (e) {
        $(displayEl).text($(inputEl).val().length);
        if ($(inputEl).val().length == 10) {
            getNameforMobileNumber();
        }
    });
    $(inputEl).keydown(function (e) {
        // Allow: backspace, delete, tab, escape, enter and .
        if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
        // Allow: Ctrl+A
            (e.keyCode == 65 && e.ctrlKey === true) ||
        // Allow: home, end, left, right
            (e.keyCode >= 35 && e.keyCode <= 39)) {
            // let it happen, don't do anything
            return;
        }
        // Ensure that it is a number and stop the keypress
        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
            e.preventDefault();
        }
        if (e.keyCode == 8 || e.keyCode == 46) {
            $(displayEl).text($(inputEl).val().length);
        }        
    });

}

function OnFocus() {
    crs.focus = {};
    crs.focus.el = '';
    crs.focus.bgColor = '#FFF';
    $("input, button, select, textarea, .chosen-container, .form-group, a").focus(function () {
        //console.log(this);
        var focusBGColor = 'rgb(255,249,216)';
        var focusBGColorBtn = 'rgb(122,46,0)';
        var el = this;
        if (crs.focus.el == el || $(crs.focus.el).attr('id') == $(el).attr('id')) {            
            return false;
        }
        if ($(el).filter('[id*="_chosen_"]').length > 0) {
            var selElID = $(el).attr('id');
            var selElIDExp = selElID.split('_');
            el = $('#' + selElIDExp[0] + '_' + selElIDExp[1] + ' a.chosen-single');
        }
        $(crs.focus.el).css('background-color', crs.focus.bgColor);
        crs.focus.bgColor = $(el).css('background-color');
        if ($(el).prop("tagName") == 'BUTTON' || ($(el).prop("tagName") == 'A' && $(el).hasClass('btn-orange') ) )
            $(el).css('background-color', focusBGColorBtn);
        else
            $(el).css('background-color', focusBGColor);
                    
        crs.focus.el = el;
    });
}

function GroupIndexTab(el) {    
    if (el.find('.chosen-container').length != 0 || el.hasClass('chosen-container'))
        var indexVal = $(el).find('a[index-group]').attr('index-group');
    else
        var indexVal = el.attr('index-group');
    var selIndexGroup = $('[index-group=' + '"' + indexVal + '"]');
    var nextIndexVal = parseInt(indexVal) + 1;
    if (typeof crs.bkg != "undefined" && typeof crs.bkg.currencyID != "undefined" && crs.bkg.currencyID == 2 && indexVal == 12) {
        nextIndexVal = parseInt(indexVal) + 4;
    }
    for (var i = 0; i < 100; i++) {
        if (!$('[index-group=' + '"' + nextIndexVal + '"]').is(':visible') || $('[index-group=' + '"' + nextIndexVal + '"]').prop('disabled'))
            nextIndexVal++;
        else
            break;
    }
    if (selIndexGroup.length == 1) {
        if ($('[index-group=' + '"' + nextIndexVal + '"]').length == 1) {
            for (var i = 0; i < 100; i++) {
                if (!$('[index-group=' + '"' + nextIndexVal + '"]').is(':hidden')) {
                    $('[index-group=' + '"' + nextIndexVal + '"]').focus();                    
                    return false;
                }
                nextIndexVal++;
            }
        } else if ($('[index-group=' + '"' + nextIndexVal + '"]').length > 1) {
            if ($('[index-group=' + '"' + nextIndexVal + '"]').is(':visible')) {
                var isFocussed = false;
                $('[index-group=' + '"' + nextIndexVal + '"]').filter('[index-tab=1]').each(function (eLIndex, elementL) {
                    if ($(elementL).is(':visible')) {
                        $(elementL).focus();                       
                        isFocussed = true;
                    }
                });
            }
        }
    } else {
        if (el.find('.chosen-container').length != 0 || el.hasClass('chosen-container'))
            var indexTab = $(el).find('a[index-group]').attr('index-tab');
        else {
            var indexTab = $(el).attr('index-tab');
        }
        var nextIndexTab = parseInt(indexTab) + 1;
        if (selIndexGroup.filter('[index-tab=' + '"' + nextIndexTab + '"]').length != 0) {
            var isFocussed = false;
            for (var i = 0; i < 100; i++) {
                if (selIndexGroup.filter('[index-tab=' + '"' + nextIndexTab + '"]').is(':visible') && !selIndexGroup.filter('[index-tab=' + '"' + nextIndexTab + '"]').prop('disabled')) {
                    selIndexGroup.filter('[index-tab=' + '"' + nextIndexTab + '"]').focus();
                    isFocussed = true;
                    break;
                }
                nextIndexTab++;
            }
            if (!isFocussed) {
                $('[index-group=' + '"' + nextIndexVal + '"]').focus();
            }
        } else if ($('[index-group=' + '"' + nextIndexVal + '"]').length == 1) {
            $('[index-group=' + '"' + nextIndexVal + '"]').focus();
        }
        else if ($('[index-group=' + '"' + nextIndexVal + '"]').length > 1) {
            if ($('[index-group=' + '"' + nextIndexVal + '"]').is(':visible') && !$('[index-group=' + '"' + nextIndexVal + '"]').prop('disabled')) {
                var isFocussed = false;
                $('[index-group=' + '"' + nextIndexVal + '"]').filter('[index-tab=1]').each(function (eLIndex, elementL) {
                    if ($(elementL).is(':visible')) {
                        $(elementL).focus();
                        isFocussed = true;
                    }
                });
            }
            if (!isFocussed) {
                $('[index-group=' + '"' + nextIndexVal + '"]').focus();
            }
        }
    }
}

function NoGroupIndexTab(el) {
    var iname = el.val();
    if (iname !== 'Submit') {
        var fields = el.closest('div[index-enabled="yes"]').find('button, input, textarea, select, a');
        if (el.hasClass('chosen-container')) {
            el = el.prev('select.chosen-select');
        }
        var index = fields.index(el);
        if (index > -1 && (index + 1) < fields.length) {
            if (el.hasClass('chosen-select')) {
                index++;
            }
            if (fields.eq(index + 1).hasClass('chosen-select')) {
                var id = fields.eq(index + 1).attr('id');
                $('#' + id + '_chosen').find('a.chosen-single').focus();
                //                $('[data-enterfocus="true"]').css('background-color', '#fff');
                //                $('#' + id + '_chosen').find('a.chosen-single').css('background-color', focusBGColor);                
                //                $('#' + id + '_chosen').find('a.chosen-single').attr('data-enterfocus', 'true');
            }
            else {
                for (var i = index; i < fields.length; i++) {
                    var nextIndex = i + 1;
                    if ($(fields[nextIndex]).is(':visible') && !$(fields[nextIndex]).prop('Sdisabled')) {
                        $(fields[nextIndex]).focus();
                        //                        $('[data-enterfocus="true"]').css('background-color', '#fff');
                        //                        $(fields[nextIndex]).css('background-color', focusBGColor);
                        //                        $(fields[nextIndex]).attr('data-enterfocus', 'true');
                        break;
                    }
                }
            }
        }
    }
}

function OnEnter() {
    $("input, button, select, textarea, .chosen-container, .form-group, a").keypress(function (e) {
        var keycode = (e.keyCode ? e.keyCode : e.which);
        if (keycode == 13) {
            e.preventDefault();
            var el = $(this);
            if (!onEnterFilter(el))
                return false;
            if (el.filter('[id*="_chosen_"]').length == 1 || (el.prop('tagName') == 'A' && el.hasClass('chosen-single'))) {
                el = el.closest('.chosen-container');
            }

            if (el.find('.chosen-container').length != 0 || el.hasClass('chosen-container'))
                var hasIndexGroup = el.find('a[index-group]').attr('index-group');
            else
                var hasIndexGroup = el.attr('index-group');

            if (typeof hasIndexGroup !== 'undefined' && hasIndexGroup !== false)
                GroupIndexTab(el);
            else
                NoGroupIndexTab(el);
            return false;
        }
    });
}

function onEnterFilter(el) {
    var filterData = el.data('enter');
    if (typeof filterData != 'undefined') {
        if (filterData == "double" && el.prop('tagName') == "SELECT") {
            var filterDataOption = el.find('option:selected').data('enter');
            if (typeof filterDataOption != "undefined" && filterDataOption == "selected") {
                el.find('option').data('enter', 'unselected');
                return true;
            } else {
                el.find('option').data('enter', 'unselected');
                el.find('option:selected').data('enter', 'selected');
                return false;
            }
        } else if (filterData == "ticketNo" && el.prop('tagName') == "INPUT") {
            var elVal = el.val().trim();
            if (elVal == "") {
                alert(crs.validation.ticketNo);
                return false;
            }
        } else if (filterData == "mobileNo" && el.prop('tagName') == "INPUT") {
            var elVal = el.val().trim();
            if (typeof crs.bkg != "undefined" && typeof crs.bkg.currencyID != "undefined" && crs.bkg.currencyID == 2) {
                if (elVal == "" || elVal.length != 9) {
                    alert(crs.validation.mobileNo);
                    return false;
                }
            }
            else if (elVal == "" || elVal.length != 10) {
                if (crs.bkg.companyID != 28) {
                    alert(crs.validation.mobileNo);
                    return false;
                } else {
                    var bkgType = $('#cmbBookingType').val();
                    if (bkgType != 3) {
                        alert(crs.validation.mobileNo);
                        return false;
                    }
                }
            }
        } else if (filterData == "seatNo" && el.prop('tagName') == "INPUT") {
            var elVal = el.val().trim();
            if (elVal == "") {
                alert(crs.validation.seatNo);
                el.focus();
                return false;
            }
        } else if (filterData == "paxName" && el.prop('tagName') == "INPUT") {
            var elVal = el.val().trim();
            if (elVal == "") {
                alert(crs.validation.paxName);
                return false;
            }
        }
    } 
    
    return true;
    
}

function shortCutKeys() {
    var $doc = 'body, input, button, select, textarea, .chosen-container, .form-group';
    $($doc).on('keydown', null, 'alt+S', function () {
        $('#btnSave').trigger('click');        
    }).on('keydown', null, 'alt+A', function () {
        $('#cmbCityFrom_chosen a').focus();
    }).on('keydown', null, 'alt+T', function () {
        $('#cmbCityTo_chosen a').focus();
    }).on('keydown', null, 'alt+L', function () {
        $('#txtSearchValue').focus();
    }).on('keydown', null, 'alt+P', function () {
        $('#txtMobilePax').focus();
    }).on('keydown', null, 'alt+Z', function () {
        $('#routeSearchResult').focus();
    }).on('keydown', null, 'alt+X', function () {
        $('#cmbBookingType_chosen a').focus();
    }).on('keydown', null, 'alt+C', function () {
        $('#selNoOfSeats').focus();
    }).on('keydown', null, 'alt+N', function () {
        $('#pax-name-1').focus();
    }).on('keydown', null, 'alt+V', function () {
        $('#cmbDD').focus();
    }).on('keydown', null, 'alt+Q', function () {
        $('#btnRemoveQuota').trigger('click');
    }).on('keydown', null, 'alt+I', function () {
        var $enquiryEls = $('#ReportList li a:contains("Pickupwise")');
        if ($enquiryEls.length != 0)
            $($enquiryEls[0]).trigger('click');
    });    
}

//common function to find index of a value in 2- dimensional array 

// Example use ----     alert(myArray.objIndexOf('blue')) .. where blue is the value 

Array.prototype.objIndexOf = function (val) {
    var cnt = -1;
    for (var i = 0, n = this.length; i < n; i++) {
        cnt++;
        for (var o in this[i]) {
            if (this[i][o] == val) return cnt;
        }
    }
    return -1;
}

function bsConfirm(msg, callback, cancelCallBackFunc) {
    var dialog = BootstrapDialog.confirm(msg, function (result) {
        if (result) {
            if (typeof callback != 'undefined') {
                for (var i = 0; i < callback.length; i++) {
                    if (callback[i].params != 'undefined' && callback[i].params != '')
                        callback[i].func(callback[i].params);
                    else
                        callback[i].func();
                }
            }
            dialog.close();
            return true;
        } else {
            if (typeof cancelCallBackFunc != 'undefined') {
                cancelCallBackFunc();
            }
        }
    });
    if (typeof (dialog.options.buttons[1]) != "undefined") {
        setTimeout(function () {
            $('#' + dialog.options.buttons[1].id).focus();
            bsButtonConfirmMove(dialog.options.buttons);            
        }, 500);
    }
}

function bsButtonConfirmMove(el) {   
    $('#' + el[0].id + ', #' + el[1].id).keydown(function (e) {
        var keycode = (e.keyCode ? e.keyCode : e.which);        
        if (keycode == 37) {
            e.preventDefault();
            $('#' + el[0].id).focus();
        } else if (keycode == 39) {
            e.preventDefault();
            $('#' + el[1].id).focus();
        }
    });
}


function bsAlert(msg) {
    var dialogAlert = BootstrapDialog.alert(msg);
    if (typeof (dialogAlert.options.buttons[0]) != "undefined") {
        setTimeout(function () {
            $('#' + dialogAlert.options.buttons[0].id).focus();            
        }, 500);
    }
}

function bsAlert2(msg, myFunction) {
    BootstrapDialog.show({
        title: 'Information',
        message: msg,
        buttons: [{
            label: 'OK',
            action: function (dialog) {
                dialog.close();
                myFunction();
            }
        }]
    });
}


function find_duplicates(arr) {
    var len = arr.length,
      out = [],
      counts = {};

    for (var i = 0; i < len; i++) {
        var item = arr[i];
        var count = counts[item];
        counts[item] = counts[item] >= 1 ? counts[item] + 1 : 1;
    }

    for (var item in counts) {
        if (counts[item] > 1)
            out.push(item);
    }

    return out;
}

Array.prototype.unique = function () {
    var tmp = {}, out = [];
    for (var i = 0, n = this.length; i < n; ++i) {
        if (!tmp[this[i]]) { tmp[this[i]] = true; out.push(this[i]); }
    }
    return out;
}

function getPosition(str, m, i) {
    return str.split(m, i).join(m).length;
}

ucfirst = function (string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

if (!String.prototype.trim) {
    String.prototype.trim = function () {
        return this.replace(/^\s+|\s+$/g, '');
    }
}

$.strPad = function (input, pad_length, pad_string, pad_type) {
    var output = input.toString();
    if (pad_string === undefined) { pad_string = ' '; }
    if (pad_type === undefined) { pad_type = 'STR_PAD_RIGHT'; }
    if (pad_type == 'STR_PAD_RIGHT') {
        while (output.length < pad_length) {
            output = output + pad_string;
        }
    } else if (pad_type == 'STR_PAD_LEFT') {
        while (output.length < pad_length) {
            output = pad_string + output;
        }
    } else if (pad_type == 'STR_PAD_BOTH') {
        var j = 0;
        while (output.length < pad_length) {
            if (j % 2) {
                output = output + pad_string;
            } else {
                output = pad_string + output;
            }
            j++;
        }
    }
    return output;
};

function showShortCutsInfo() {
    $('#shortCutsInfo').click(function () {
        ShowProgressBar(true);
        var request = $.ajax({
            url: "/Booking/ShortCutsView",
            type: "GET",
            dataType: "html"
        });

        request.done(function (view) {
            ShowProgressBar(false);
            $("#shortCutsModal .modal-dialog").html(view);
            $("#shortCutsModal").modal('show');
        });

        request.fail(function (jqXHR, textStatus) {
            ShowProgressBar(false);
            bsAlert("Request failed: " + textStatus);
        });
    });
}

function nextLetter(s) {
    return s.replace(/([a-zA-Z])[^a-zA-Z]*$/, function (a) {
        var c = a.charCodeAt(0);
        switch (c) {
            case 90: return null; break;
            case 122: return null; break;
            default: return String.fromCharCode(++c);
        }
    });
}

function inputOnlyNumbers(inputEl) {
    $(inputEl).keydown(function (e) {
        // Allow: backspace, delete, tab, escape, enter and .
        if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
        // Allow: Ctrl+A
            (e.keyCode == 65 && e.ctrlKey === true) ||
        // Allow: home, end, left, right
            (e.keyCode >= 35 && e.keyCode <= 39)) {
            // let it happen, don't do anything
            return;
        }
        // Ensure that it is a number and stop the keypress
        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
            e.preventDefault();
        }        
    });
}

function KeepSessionAlive() {
    $.post("/Home/RefreshSession", null, function () {
        console.log('session is alive');
    });
}
function CustomSelect(callback) {
    var x, i, j, selElmnt, a, b, c;
    /*look for any elements with the class "custom-select":*/
    x = document.getElementsByClassName("custom-select");
    for (i = 0; i < x.length; i++) {
        selElmnt = x[i].getElementsByTagName("select")[0];
        /*for each element, create a new DIV that will act as the selected item:*/
        a = document.createElement("DIV");
        a.setAttribute("class", "select-selected");
        a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
        x[i].appendChild(a);
        /*for each element, create a new DIV that will contain the option list:*/
        b = document.createElement("DIV");
        b.setAttribute("class", "select-items select-hide");
        for (j = 0; j < selElmnt.length; j++) {
            /*for each option in the original select element,
            create a new DIV that will act as an option item:*/
            c = document.createElement("DIV");
            c.innerHTML = selElmnt.options[j].innerHTML;
            c.addEventListener("click", function (e) {
                /*when an item is clicked, update the original select box,
                and the selected item:*/
                var y, i, k, s, h;
                s = this.parentNode.parentNode.getElementsByTagName("select")[0];
                h = this.parentNode.previousSibling;
                for (i = 0; i < s.length; i++) {
                    if (s.options[i].innerHTML == this.innerHTML) {
                        s.selectedIndex = i;
                        h.innerHTML = this.innerHTML;
                        y = this.parentNode.getElementsByClassName("same-as-selected");
                        for (k = 0; k < y.length; k++) {
                            y[k].removeAttribute("class");
                        }
                        this.setAttribute("class", "same-as-selected");
                        break;
                    }
                }
                h.click();
                if (callback != undefined) {
                    callback();
                }
            });
            b.appendChild(c);
        }
        x[i].appendChild(b);
        a.addEventListener("click", function (e) {
            /*when the select box is clicked, close any other select boxes,
            and open/close the current select box:*/
            e.stopPropagation();
            closeAllSelect(this);
            this.nextSibling.classList.toggle("select-hide");
            this.classList.toggle("select-arrow-active");
        });
    }
    function closeAllSelect(elmnt) {
        /*a function that will close all select boxes in the document,
        except the current select box:*/
        var x, y, i, arrNo = [];
        x = document.getElementsByClassName("select-items");
        y = document.getElementsByClassName("select-selected");
        for (i = 0; i < y.length; i++) {
            if (elmnt == y[i]) {
                arrNo.push(i)
            } else {
                y[i].classList.remove("select-arrow-active");
            }
        }
        for (i = 0; i < x.length; i++) {
            if (arrNo.indexOf(i)) {
                x[i].classList.add("select-hide");
            }
        }
    }
    /*if the user clicks anywhere outside the select box,
    then close all select boxes:*/
    document.addEventListener("click", closeAllSelect);
    
}