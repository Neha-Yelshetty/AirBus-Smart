using System.Web;
using System.Web.Optimization;

namespace Shmart
{
    public class BundleConfig
    {
        // For more information on bundling, visit https://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/Scripts/jquery.validate*"));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at https://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                      "~/Scripts/bootstrap.js"));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                      "~/Content/bootstrap.css",
                      "~/Content/site.css"));

            bundles.Add(new StyleBundle("~/css").Include("~/Content/css/utilities.css",
               "~/Content/css/bootstrap.ow.css",
               "~/Content/css/plugins/morris/morris-0.4.3.aaa.css",
               "~/Content/css/plugins/timeline/timeline.css",
               "~/Content/jquery.qtip.min.css",
               "~/Content/css/plugins/dataTables/dataTables.bootstrap.css",
               "~/Content/css/plugins/dataTables/jquery.datatables.css"
           ));

            bundles.Add(new StyleBundle("~/Content/Common").Include(
               "~/Content/css/chosen.css", "~/Content/css/jquery.contextMenu.css",
               "~/Content/themes/smoothness/jquery-ui.css",
               "~/Content/datepicker.css",
               "~/Content/css/booking.css",
               "~/Scripts/kendoui/styles/kendo.common.min.css",
               "~/Scripts/kendoui/styles/kendo.default.min.css",
               "~/Content/css/Common.css"
           ));



            bundles.Add(new ScriptBundle("~/bundles/js").Include(
               "~/Scripts/common.js",
               "~/Scripts/jquery-1.10.2.js",
               "~/Scripts/generic.js",
               "~/Scripts/jquery.validate.js",
               "~/Scripts/jquery-validate.bootstrap-tooltip.js",
               "~/Scripts/bootstrap-dialog.js",
               "~/Scripts/plugins/metisMenu/jquery.metisMenu.js",
               "~/Scripts/date.js",
               "~/Scripts/sb-admin.js",
               "~/Scripts/plugins/dataTable/jquery.dataTables.js",
               "~/Scripts/plugins/dataTable/jquery.dataTables.min.js",
               "~/Scripts/plugins/dataTable/dataTables.bootstrap.js",
               "~/Scripts/plugins/dataTable/jquery.dataTables.columnFilter.js",
               "~/Scripts/plugins/dataTable/jquery.dataTables.editable.js",
               "~/Scripts/plugins/dataTable/jquery.jeditable.js",
               "~/Scripts/chosen.jquery.js",
               "~/Scripts/jquery.contextMenu.js",
               "~/Scripts/utilities.js",
               "~/Scripts/jquery.qtip.min.js",
               "~/Scripts/bootstrap-datepickercrs.js",
               "~/Scripts/moment.js",
               "~/Scripts/jquery-ui-1.10.4.js",
               "~/Scripts/plugins/jquery.hotkeys.js",
               "~/Scripts/lodash.js",
               "~/Scripts/plugins/chartJS/Chart.min.js",
               "~/Scripts/plugins/chartJS/Chart.HorizontalBar.js",
               "~/Scripts/plugins/chartJS/legend.js"
           ));


        }
    }
}
