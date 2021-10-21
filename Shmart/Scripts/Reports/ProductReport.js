smart = window.smart || {};
smart.reports = smart.reports || {};

smart.ProductReport = function () {

    //alert("HI");

    getVoucherDetailData();
    addprod();
    closeaddprod();
    closeuppprod();

 /*   $('#leftArrow,#rightArrow').css("display", "none");*/

    //$('#leftArrow').click(function () {
    //    $('#rightArrow').removeClass("disabled");

    //    var leftPos = $('.dataTables_wrapper').scrollLeft();
    //    $(".dataTables_wrapper").animate({ scrollLeft: leftPos - 300 }, 600);
    //    //        console.log(leftPos);
    //    //        if (leftPos == 0 || leftPos == 107) {
    //    //            $("#leftArrow").addClass("disabled");
    //    //        }
    //});

    //$('#rightArrow').click(function () {
    //    $('#leftArrow').removeClass("disabled");

    //    var leftPos = $('.dataTables_wrapper').scrollLeft();
    //    $(".dataTables_wrapper").animate({ scrollLeft: leftPos + 300 }, 600);
    //    //        console.log(leftPos);
    //    //        if (leftPos == 300) {
    //    //            $("#rightArrow").addClass("disabled");
    //    //        }
    //});

    $('#searchtext').on('keyup', function () {
        var table = $('#productData table').DataTable();
        table.search(this.value).draw();
    });


  

    function addprod() {
        $('#addnewproduct').click(function () {
          //  $('#ModalNewInsert').modal('show');
            $("#ModalNewInsert").show();
            $('#ModalNewInsert').toggleClass('modal open modal fade');
           // FocusFirstInput("#ModalNewInsert");
        });
    }

    function closeaddprod() {
        $('#idinscancel').click(function () {
            //  $('#ModalNewInsert').modal('show');
            $("#ModalNewInsert").hide();
            $('#ModalNewInsert').toggleClass('modal open modal fade');
            // FocusFirstInput("#ModalNewInsert");
        });
    }


    function closeuppprod() {
        $('#idupscancel').click(function () {
            //  $('#ModalNewInsert').modal('show');
            $("#Modalupdate").hide();
            $('#Modalupdate').toggleClass('modal open modal fade');
            // FocusFirstInput("#ModalNewInsert");
        });
    }



    $('#idinsprodsave').click(function () {

        var ProductName = $('#insproductname').val();
        var Productcategory = $('#insproductcategory').val();
        var Productdescription = $('#insproductdescri').val();
        var units = $('#insproductunit').val();



        var request = $.ajax({
            url: "/Report/ProductInsert",
            type: "POST",
            data: {
                'ProductName': ProductName, 'Productcategory': Productcategory, 'Productdescription': Productdescription, 'units': units
            },
            dataType: "html"
        });
        request.done(function (dataVoucherDetail) {
            $("#divProgressBar").hide();
            var dataVoucherDetailResponse = $.parseJSON($.parseJSON($.parseJSON(dataVoucherDetail)));
            console.log(dataVoucherDetailResponse.length);

            if (dataVoucherDetailResponse.Table[0]["IsSuccess"] == "1") {
                alert(dataVoucherDetailResponse.Table[0]["Msg"]);
                $('#ModalNewInsert').hide();
                getVoucherDetailData();
                fillVoucherDetailTable([]);
            }
            else {
                alert(dataVoucherDetailResponse.Table[0]["Msg"]);
            }

        });
        request.fail(function (jqXHR, textStatus) {
            $("#divProgressBar").hide();
            alert("Error in processing request. Please try again.");
        });

    });

    $('#loadData').click(function () {

        

        if (smart.reports.ProductReport.Table.length > 0) {

            var filterdata = _.filter(smart.reports.ProductReport.Table, function (f) { return f.ProductCategory == $("#cmbpgprovider").val() })

           /* $("#VoucherHeader").html("<span>Date from " + moment(fromDate, "MM/DD/YYYY").format('DD MMM YYYY') + " - " + moment(toDate, "MM/DD/YYYY").format('DD MMM YYYY') + "</span>");*/
            //  var VoucherData = $.parseJSON(dataVoucherDetailResponse.responseData)

            //if ($.fn.DataTable.isDataTable('#VoucherData table')) {
            //    $('#VoucherData table').DataTable().destroy();
            //}
            //
            //  btntblevent();

            $('#productData').show();

            if ($("#cmbpgprovider").val() == '0')
                fillVoucherDetailTable(smart.reports.ProductReport.Table);
            else
                fillVoucherDetailTable(filterdata);
        } else {
            if (smart.reports.ProductReport.responseData == undefined || smart.reports.ProductReport.isSuccess == false) {
                $.alert("No Data found");
               /* $('#leftArrow,#rightArrow').css("display", "");*/
                $('#Export').css("display", "none");
                fillVoucherDetailTable([]);
            }
            else {
                alert(smart.reports.ProductReport.error);
            }
        }
    });


    function getVoucherDetailData() {
       
        $("#divProgressBar").show();
        var ProductCategory = "";
            var request = $.ajax({
                url: "/Report/ProductData",
                type: "POST",
                data: {
                    'ProductCategory': ProductCategory
                },
                dataType: "html"
            });
        request.done(function (dataVoucherDetail) {
            $("#divProgressBar").hide();
            var dataVoucherDetailResponse = $.parseJSON($.parseJSON(dataVoucherDetail));
            console.log(dataVoucherDetailResponse.length);
            smart.reports.ProductReport = dataVoucherDetailResponse;

            var uniquedata = _.uniqBy(dataVoucherDetailResponse.Table, function (e) {
                return e.ProductCategory;
            });

            var selHtml = "<option value='0'>Select All</option>";

            for (var i = 0; i < uniquedata.length; i++) {
                // if (typeof MasterBusNumberList[i] != 'undefined')
                selHtml += "<option value='" + uniquedata[i]["ProductCategory"] + "'>" + uniquedata[i]["ProductCategory"] + "</option>";
            }

            $('#cmbpgprovider').html(selHtml);
            $('#cmbpgprovider').trigger('chosen:updated');

            });
            request.fail(function (jqXHR, textStatus) {
                $("#divProgressBar").hide();
                alert("Error in processing request. Please try again.");
            });
        
    }


    function fillVoucherDetailTable(VoucherData) {
        fbTable = $('#productData table').dataTable({
            "scroll": true,
            "scrollCollapse": true,
            "paging": true,
            "data": VoucherData,
            "bDestroy": true,
            "bFilter": false,
            "searching": true,
            "aaSorting": [],
            "tableTools": {
                "fnRowSelected": function (nodes) {
                    alert('The row with ID ' + nodes[0].id + ' was selected');
                }
            },
            "aoColumns": [
                { "mData": "ProductId", "sTitle": "ProductId" },
                { "mData": "ProductName", "sTitle": "ProductName" },
                { "mData": "ProductCategory", "sTitle": "ProductCategory" },
                { "mData": "ProductDescription", "sTitle": "ProductDescription" },
                { "mData": "Units", "sTitle": "Units" },
                {
                    "mData": 'ProductId', "sTitle": "Edit",
                    "mRender": function (data, type, full) {
                        {
                            return '<button class="submit" value="Edit" style="padding: 2px 16px;">Edit</button>';
                            rowIndex++;
                        }
                    }
                }
            ]

        });
        $(".dataTables_filter").hide();

        $('#productData_length').hide();
        $('#productData_info').hide();

        $('#productData table tbody tr td').each(function () {
            var sTitle;
            if ($(this).width() > 300) {
                sTitle = $(this).text();
                this.setAttribute("title", sTitle)
                // $(this).parent().attr ( "title", sTitle)
            }

        });
        //fbTable.$('td').tooltip({
        //    "container": "body",
        //    "placement": "right"
        //});

    }



    $('#productData tbody').on('click', 'tr td button', function () {
        var table = $('#productData table').DataTable();
        $this = $(this).closest("tr");
        smart.reports.ProductReport.rowIndexSelectedData = table.row($this).data();
        if ($(this).val() == "Edit") {

            $('#upproductid').val(table.row($this).data().ProductId);
            $('#upsproductname').val(table.row($this).data().ProductName);
            $('#upsproductcat').val(table.row($this).data().ProductCategory);
            $('#upproductdescri').val(table.row($this).data().ProductDescription);
            $('#upproductunit').val(table.row($this).data().Units);

            $("#Modalupdate").show();
            $('#Modalupdate').toggleClass('modal open modal fade');
          

        }
        
    });

    $('#idupsprod').click(function () {

        var ProductId= $('#upproductid').val();
        var Productdescription = $('#upproductdescri').val();
        var units =  $('#upproductunit').val();

        var request = $.ajax({
            url: "/Report/ProductUpdate",
            type: "POST",
            data: {
                'ProductId': ProductId, 'Productdescription': Productdescription, 'units': units
            },
            dataType: "html"
        });
        request.done(function (dataVoucherDetail) {
            $("#divProgressBar").hide();
            var dataVoucherDetailResponse = $.parseJSON($.parseJSON($.parseJSON(dataVoucherDetail)));
            console.log(dataVoucherDetailResponse.length);

            if (dataVoucherDetailResponse.Table[0]["IsSuccess"] == "1") {
                alert(dataVoucherDetailResponse.Table[0]["Msg"]);
                $('#ModalNewInsert').hide();
                getVoucherDetailData();
                fillVoucherDetailTable([]);
            }
            else {
                alert(dataVoucherDetailResponse.Table[0]["Msg"]);
            }

        });
        request.fail(function (jqXHR, textStatus) {
            $("#divProgressBar").hide();
            alert("Error in processing request. Please try again.");
        });


    });


}