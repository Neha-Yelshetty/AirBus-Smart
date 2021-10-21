

crs = window.crs || {};
crs.master = crs.master || {};
var formatData;
        var dtBooking;
        var formatType;
        var ticketFormat;
        var ticketDimension;
        var strFontFamily;
        var blnHasAllCaps;
        var ticketLabels = [];
        var strPolicy;
//crs.MRRetrievePNRReport || {};
crs.PrintTicket = {

    CallPrintFunction: function (intbookingID) {

        //var  intbookingID = bookingResult[0].BookingID;
        var companyID = crs.bkg.companyID;
        var branchID = crs.bkg.branchID;
        var userID = crs.bkg.userID;
        var printType = "B";
        bookingID = intbookingID;

        //        if (companyID == 407 || companyID == 881 || companyID == 1152 || companyID == 482) {
        //            ShowProgressBar(true);
        //            $("#printTicketTemp").load("/Print/BallalTicketFormat", function (response, status, xhr) {
        //                ShowProgressBar(false);
        //                if (status == "error") {
        //                    bsAlert("There was some error in processing .Please try again");
        //                } else {
        //                    printBallalTicket(intbookingID, companyID, branchID, userID);
        //                }
        //            });
        //            return;
        //        }

        $.ajax({
            type: "POST",
            url: '/Print/FillControls',
            dataType: "json",
            data: { intBookingID: intbookingID, intCompanyID: companyID, intBranchID: branchID, intUserID: userID, strPrintType: printType },
            success: function (result) {

                var multipleTableResult = JSON.parse(result);
                crs.PrintTicket.CreateLayoutForPrinting(multipleTableResult, printType);
                ShowProgressBar(false);

            },
            error: function (xhr, ajaxOptions, thrownError) {

                bsAlert("There was some error in processing .Please try again");
                console.log(xhr);
                console.log(ajaxOptions);
                console.log(thrownError);

                ShowProgressBar(false);
            }
        });

    },
    CallPrintPNRFunction: function (intbookingID) {

        //var  intbookingID = bookingResult[0].BookingID;
        var companyID = crs.bkg.companyID;
        var branchID = crs.bkg.branchID;
        var userID = crs.bkg.userID;
        var printType = "R";
        bookingID = intbookingID;
      

        $.ajax({
            type: "POST",
            url: '/Print/FillControls',
            dataType: "json",
            data: { intBookingID: intbookingID, intCompanyID: companyID, intBranchID: branchID, intUserID: userID, strPrintType: printType },
            success: function (result) {

                var multipleTableResult = JSON.parse(result);
                crs.PrintTicket.CreateLayoutForPrinting(multipleTableResult, printType);
                ShowProgressBar(false);

            },
            error: function (xhr, ajaxOptions, thrownError) {

                bsAlert("There was some error in processing .Please try again");
                console.log(xhr);
                console.log(ajaxOptions);
                console.log(thrownError);

                ShowProgressBar(false);
            }
        });

    },
    CreateLayoutForPrinting: function (multipleTableResult, strPrintType) {

        
        formatData = multipleTableResult.TicketFormatTable;
        dtBooking = multipleTableResult.BookingInfoTable;
        dtPrintOtherInfo = multipleTableResult.PrintOtherInfoTable;

        if (dtBooking != null) {
            if (dtBooking[0].ErrMsg.toString() != "") {
                bsAlert("There is  error in printing :" + dtBooking[0].ErrMsg);
                return false;
            }
            if (strPrintType == "B")
                intTicketFormatID = parseInt(dtBooking[0].TicketFormatID);
            else if (strPrintType == "R" || strPrintType == "RE") {
                if (crs.bkg.companyID == 1945 || crs.bkg.companyID == 1)
                    intTicketFormatID = 848;
                else
                    intTicketFormatID = parseInt(dtBooking[0].TicketFormatID);
            }  
            else
                intTicketFormatID = parseInt(dtBooking[0].TicketFormatIDCancel);

            if (intTicketFormatID == 0 && strPrintType == "C") {
                bsAlert("Ticket Format is not assigned for Cancel Print.");
                return false;
            }
            formatType = formatData[0].TicketFormatType;
            ticketFormat = formatData[0].TicketFormat;
            ticketDimension = formatData[0].Dimension;
            strFontFamily = formatData[0].FontFamily;
            blnHasAllCaps = formatData[0].IsAllCaps;
            strPolicy = dtPrintOtherInfo[0];
            toPrintA4 = dtPrintOtherInfo[1];
            if (blnHasAllCaps == 1) {
                blnHasAllCaps = true;
            }
            else {
                blnHasAllCaps = false;
            }
            if (strFontFamily == "" || strFontFamily == null) {
                strFontFamily = "Microsoft Sans Serif";

            }
            // changing the font to Helvetica /Arial 
            strFontFamily = "Helvetica,Arial";
            if (crs.bkg.companyID == 407) {
                strFontFamily = "Open Sans";

            }


            var dimension = [];
            dimension = ticketDimension.split(',');

            //var ticketLabels = [];
            ticketLabels = ticketFormat.split('^');
            var pxHeight = parseInt((parseInt(dimension[0]) * 3.7735));
            var pxWidth = parseInt((parseInt(dimension[1]) * 3.7735));
            var toPrintA4 = "";

            try {
                toPrintA4 = "0";
            }
            catch (err)
            { }
            if ((crs.bkg.companyID == 1945 || crs.bkg.companyID == 1) && (strPrintType == "R" || strPrintType == "RE"))
            { toPrintA4 = "1"; }

            if (toPrintA4 == "1") {
                ShowProgressBar(false);
                crs.PrintTicket.PrintA4SizeTicket(pxHeight, pxWidth, ticketLabels, formatData);
            }
            else {
                ShowProgressBar(false);
                crs.PrintTicket.PrintNormalSizeTicket(pxHeight, pxWidth, ticketLabels, formatData);
            }
        }
    },

    PrintA4SizeTicket: function (pxHeight, pxWidth, ticketLabels, formatData) {
        var htmlPrintLayout = "";
        htmlPrintLayout = '<div  style="position: absolute; left: 0px; top: 0px; width:' + pxWidth + '; height:' + pxHeight + '; padding: 0px; border: 0px;" id="wrapper" >';

        for (var label = 0; label < ticketLabels.length; label++) {
            if (ticketLabels[label] == "")
                continue;

            var ticketLabel = [];

            ticketLabel = ticketLabels[label].split('|');

            var lblType = ticketLabel[5];

            if (lblType == "D" && formatType == "P")
                continue;

            var divHTML = '<div '
            var fontSize = (parseFloat)(parseInt(ticketLabel[4]));
            if (ticketLabel[1].indexOf('@@') >= 0) {
                var IsBold = "0";

                if (ticketLabel.length == 7) {
                    if (ticketLabel[6].toString() == "1")
                        IsBold = "1";
                }
                var tdStyle = "";
                if (IsBold != "0")
                    tdStyle = ' style="position: absolute; left: ' + parseInt(ticketLabel[2] * 1.333333) + 'px; top: ' + parseInt(ticketLabel[3] * 1.333333) + 'px ; width: auto;padding-left:5px;padding-bottom:3px;font-family:' + strFontFamily + ';font-weight:normal;font-size:' + parseInt(fontSize * 1.33333) + 'px;">';
                else
                    tdStyle = ' style="position: absolute; left: ' + parseInt(ticketLabel[2]) + 'px; top: ' + parseInt(ticketLabel[3]) + 'px;width: auto; padding-left:5px;padding-bottom:3px;font-family:' + strFontFamily + ';font-weight:bold;font-size:' + fontSize + ';">';

                var Value = "";
                divHTML += tdStyle;
                try {
                    var colName = ticketLabel[0].substring(0, ticketLabel[0].length - 3).substring(3);
                    if (colName == "CancellationPolicy") {
                        // Value = strPolicy;
                        Value = strPolicy.PrintInfo;
                    }
                    else {
                        if (blnHasAllCaps)
                            Value = dtBooking[0][colName].toString().toUpperCase();
                        else
                            Value = dtBooking[0][colName].toString();
                    }
                }
                catch (err) {
                    Value = "";
                }
                divHTML += Value + ' </div>'
                htmlPrintLayout += divHTML;

            }
            else {

                var IsBold = "0";
                var Value = "";
                if (ticketLabel.length == 7) {
                    if (ticketLabel[6].toString() == "1")
                        IsBold = "1";
                }

                if (IsBold != "0")     
                   tdStyle = ' style="position: absolute; left: ' + parseInt(ticketLabel[2]) + 'px; top: ' + parseInt(ticketLabel[3]) + 'px ; width: auto; padding-left:5px;padding-bottom:3px;font-family:' + strFontFamily + ';font-weight:normal;font-size:' + fontSize + ';">';
                else
                    tdStyle = ' style="position: absolute; left: ' + parseInt(ticketLabel[2]) + 'px; top: ' + parseInt(ticketLabel[3]) + 'px ; width: auto; padding-left:5px;padding-bottom:3px;font-family:' + strFontFamily + ';font-weight:normal;font-size:' + fontSize + ';">';
                divHTML += tdStyle;
                if (blnHasAllCaps) {

                    Value = ticketLabel[1].toUpperCase()
                    //lbl.Text = TicketLabel[1].ToUpper();
                }
                else {
                    Value = ticketLabel[1];
                }

                //tdHTML += Value;
                divHTML += Value + ' </div>'
                htmlPrintLayout += divHTML;

            }


        }
        htmlPrintLayout += '</div>';
        ShowProgressBar(false);
        try {

            //crs.PrintTicket.PrintTicketNewWindow(htmlPrintLayout)
            // crs.PrintTicket.Print(htmlPrintLayout)
            crs.PrintTicket.PrintTicketNewWindow(htmlPrintLayout)
            ShowProgressBar(false);
        }
        catch (err) {
            bsAlert("There is  error in printing");
            ShowProgressBar(false);
        }



    },

    PrintNormalSizeTicket: function (pxHeight, pxWidth, ticketLabels, formatData) {
       // var formatData;
      //  var dtBooking;
        var formatType;
        var ticketFormat;
        var ticketDimension;
        var strFontFamily;
        var blnHasAllCaps;
        //var ticketLabels = [];
        var strPolicy;
        var toPrintA4;

        formatType = formatData[0].TicketFormatType;
        ticketFormat = formatData[0].TicketFormat;
        ticketDimension = formatData[0].Dimension;
        strFontFamily = formatData[0].FontFamily;
        blnHasAllCaps = formatData[0].IsAllCaps;
        strPolicy = dtPrintOtherInfo[0];
        toPrintA4 = dtPrintOtherInfo[1];

        var htmlPrintLayout = "";
        htmlPrintLayout = '<div  style="position: absolute; left: 0px; top: 0pt; width:' + pxWidth + 'pt; height:100%; padding: 0pt; border: 0pt;" id="wrapper" >';
        //htmlPrintLayout = '';
        for (var label = 0; label < ticketLabels.length; label++) {
            if (ticketLabels[label] == "")
                continue;

            var ticketLabel = [];

            ticketLabel = ticketLabels[label].split('|');

            var lblType = ticketLabel[5];

            if (lblType == "D" && formatType == "P")
                continue;


            var divHTML = '<div '


            var fontSize = (parseFloat)(parseInt(ticketLabel[4]));
            fontSize = fontSize * 1.33;
            if (ticketLabel[1].indexOf('@@') >= 0) {
                var IsBold = "0";

                if (ticketLabel.length == 7) {
                    if (ticketLabel[6].toString() == "1")
                        IsBold = "1";
                }

                //Convert.ToInt32(TicketLabel[2]), Convert.ToInt32(TicketLabel[3])
                var tdStyle = "";
                if (IsBold != "0")
                  tdStyle = ' style="position: absolute; left: ' + parseInt(ticketLabel[2]) + 'pt; top: ' + parseInt(ticketLabel[3]) + 'pt ; width: auto;padding-left:5px;padding-bottom:3px;font-family:' + strFontFamily + ';font-weight:normal;font-size:' + fontSize + 'pt;">';
                else
                    tdStyle = ' style="position: absolute; left: ' + parseInt(ticketLabel[2]) + 'pt; top: ' + parseInt(ticketLabel[3]) + 'pt;width: auto; padding-left:5px;padding-bottom:3px;font-family:' + strFontFamily + ';font-weight:bold;font-size:' + fontSize + 'pt;">';

                var Value = "";
                divHTML += tdStyle;
                try {
                    var colName = ticketLabel[0].substring(0, ticketLabel[0].length - 3).substring(3);
                    if (colName == "CancellationPolicy") {
                        //                        Value = strPolicy;
                        Value = strPolicy.PrintInfo;
                    }
                    else {
                        if (blnHasAllCaps)
                            Value = dtBooking[0][colName].toString().toUpperCase();
                        else
                            Value = dtBooking[0][colName].toString();
                    }
                }
                catch (err) {
                    Value = "";
                }
                divHTML += Value + ' </div>'
                htmlPrintLayout += divHTML;

            }
            else {

                var IsBold = "0";
                var Value = "";
                if (ticketLabel.length == 7) {
                    if (ticketLabel[6].toString() == "1")
                        IsBold = "1";
                }

                if (IsBold != "0")
                    tdStyle = ' style="position: absolute; left: ' + parseInt(ticketLabel[2]) + 'pt; top: ' + parseInt(ticketLabel[3]) + 'pt ; width: auto; padding-left:5px;padding-bottom:3px;font-family:' + strFontFamily + ';font-weight:normal;font-size:' + fontSize + 'pt;">';
                else
                    tdStyle = ' style="position: absolute; left: ' + parseInt(ticketLabel[2]) + 'pt; top: ' + parseInt(ticketLabel[3]) + 'pt ; width: auto; padding-left:5px;padding-bottom:3px;font-family:' + strFontFamily + ';font-weight:normal;font-size:' + fontSize + 'pt;">';
                divHTML += tdStyle;
                if (blnHasAllCaps) {
                    Value = ticketLabel[1].toUpperCase()
                }
                else {
                    Value = ticketLabel[1];
                }
                divHTML += Value + ' </div>'
                htmlPrintLayout += divHTML;
            }
        }
        htmlPrintLayout += '</div>';
        try {

            crs.PrintTicket.PrintTicketNewWindow(htmlPrintLayout)
            ShowProgressBar(false);
        }
        catch (err) {
            bsAlert("There is  error in printing");
            ShowProgressBar(false);
        }

    },

    PrintTicketNewWindow: function (htmlPrintLayout) {
        try {
            var w = window.open('', "", "width=1200, height=600, scrollbars=yes");

            $(w.document.body).html(htmlPrintLayout);
            w.focus();
            w.print();
            //w.print();
            //        w.onload = function () {
            //            w.print();
            //            setTimeout(function () { w.close(); }, 1);
            //        }
            //        w.onfocus = function () {
            //            w.close();
            //         }

            setTimeout(function () { w.close(); }, 5);
            ShowProgressBar(false);
            $('#cmbCityFrom').focus();

        }
        catch (err) {
            bsAlert("There is  error in printing");
            $('#cmbCityFrom').focus();
            ShowProgressBar(false);
        }




        //        if (navigator.userAgent.toLowerCase().indexOf('chrome') > -1) {
        //            var popupWin = window.open();
        //            popupWin.window.focus();
        //            popupWin.document.write(htmlPrintLayout);
        //            popupWin.onbeforeunload = function (event) {
        //                return 'Please use the cancel button on the left side of the print preview to close this window.\n';
        //            };
        //        } else {
        //            popupWin = window.open();
        //            popupWin.document.write(htmlPrintLayout);

        //            var document_focus = false; // var we use to monitor document focused status.
        //            // Now our event handlers.
        //            $(document).ready(function () { popupWin.window.print(); document_focus = true; });
        //        }
        //        popupWin.document.close();


    },

    //if(window.__isIE8 != undefined && window.__isIE8) {
    print: function (htmlPrintLayout) {

        try {
            win = window.open();
            win.document.write(htmlPrintLayout);

            var document_focus = false; // var we use to monitor document focused status.
            // Now our event handlers.
            $(document).ready(function () { win.window.print(); document_focus = true; });
            ShowProgressBar(false);
            //setInterval(function () { if (document_focus === true) { win.close(); } }, 300);
        }
        catch (err) {
            bsAlert("There is  error in printing");
            ShowProgressBar(false);
        }




        //         if(navigator.userAgent.toLowerCase().indexOf('chrome') > -1) {
        //        var popupWin = window.open();
        //        popupWin.window.focus();
        //        popupWin.document.write('<!DOCTYPE html><html><head>' +
        //            '<link rel="stylesheet" type="text/css" href="style.css" />' +
        //            '</head><body onload="window.print();"><div class="reward-body">' + htmlPrintLayout + '</div></html>');
        //        popupWin.onbeforeunload = function (event) {
        //            return 'Please use the cancel button on the left side of the print preview to close this window.\n';
        //        };
        //    }else {
        //        popupWin = window.open();
        //        popupWin.document.write(htmlPrintLayout);

        //                    var document_focus = false; // var we use to monitor document focused status.
        //                    // Now our event handlers.
        //                    $(document).ready(function () { popupWin.window.print(); document_focus = true; });
        //    }
        //    popupWin.document.close();











    }
};