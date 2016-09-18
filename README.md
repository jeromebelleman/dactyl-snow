Add Pentadactyl bindings to ServiceNow

```javascript
au LocationChange example.service-now.com/incident.do :map l -js plugins.snow.hscroll('incident', "columns", 1)
au LocationChange example.service-now.com/incident.do :map h -js plugins.snow.hscroll('incident', "columns", -1)
au LocationChange example.service-now.com/incident.do :map j -js plugins.snow.vscroll('incident', "lines", 1)
au LocationChange example.service-now.com/incident.do :map k -js plugins.snow.vscroll('incident', "lines", -1)
au LocationChange example.service-now.com/incident.do :map <Space> -js plugins.snow.vscroll('incident', "pages", 1)
au LocationChange example.service-now.com/incident.do :map <S-Space> -js plugins.snow.vscroll('incident', "pages", -1)
au LocationChange example.service-now.com/incident.do :map <C-d> -js plugins.snow.vscroll('incident', "pages", .5)
au LocationChange example.service-now.com/incident.do :map <C-u> -js plugins.snow.vscroll('incident', "pages", -.5)
au LocationChange example.service-now.com/incident.do :map $ -js plugins.snow.pscroll('incident', 100, null)
au LocationChange example.service-now.com/incident.do :map 0 -js plugins.snow.pscroll('incident', 0, null)
au LocationChange example.service-now.com/incident.do :map G -js plugins.snow.pscroll('incident', null, 100)
au LocationChange example.service-now.com/incident.do :map gg -js plugins.snow.pscroll('incident', null, 0)

au LocationChange example.service-now.com/u_request_fulfillment.do :map l -js plugins.snow.hscroll('u_request_fulfillment', "columns", 1)
au LocationChange example.service-now.com/u_request_fulfillment.do :map h -js plugins.snow.hscroll('u_request_fulfillment', "columns", -1)
au LocationChange example.service-now.com/u_request_fulfillment.do :map j -js plugins.snow.vscroll('u_request_fulfillment', "lines", 1)
au LocationChange example.service-now.com/u_request_fulfillment.do :map k -js plugins.snow.vscroll('u_request_fulfillment', "lines", -1)
au LocationChange example.service-now.com/u_request_fulfillment.do :map <Space> -js plugins.snow.vscroll('u_request_fulfillment', "pages", 1)
au LocationChange example.service-now.com/u_request_fulfillment.do :map <S-Space> -js plugins.snow.vscroll('u_request_fulfillment', "pages", -1)
au LocationChange example.service-now.com/u_request_fulfillment.do :map <C-d> -js plugins.snow.vscroll('u_request_fulfillment', "pages", .5)
au LocationChange example.service-now.com/u_request_fulfillment.do :map <C-u> -js plugins.snow.vscroll('u_request_fulfillment', "pages", -.5)
au LocationChange example.service-now.com/u_request_fulfillment.do :map $ -js plugins.snow.pscroll('u_request_fulfillment', 100, null)
au LocationChange example.service-now.com/u_request_fulfillment.do :map 0 -js plugins.snow.pscroll('u_request_fulfillment', 0, null)
au LocationChange example.service-now.com/u_request_fulfillment.do :map G -js plugins.snow.pscroll('u_request_fulfillment', null, 100)
au LocationChange example.service-now.com/u_request_fulfillment.do :map gg -js plugins.snow.pscroll('u_request_fulfillment', null, 0)

au LocationChange example.service-now.com/incident.do :map gw -js plugins.snow.wait('incident')
au LocationChange example.service-now.com/u_request_fulfillment.do :map gw -js plugins.snow.wait('u_request_fulfillment')

au LocationChange example.service-now.com/incident.do :map ge -js plugins.snow.edit('incident')
au LocationChange example.service-now.com/u_request_fulfillment.do :map ge -js plugins.snow.edit('u_request_fulfillment')

au LocationChange example.service-now.com/incident.do :map gc -js plugins.snow.close('incident')
au LocationChange example.service-now.com/u_request_fulfillment.do :map gc -js plugins.snow.close('u_request_fulfillment')

au LocationChange example.service-now.com/incident.do :map gs -js plugins.snow.save('incident')
au LocationChange example.service-now.com/u_request_fulfillment.do :map gs -js plugins.snow.save('u_request_fulfillment')

au LocationChange example.service-now.com/incident.do :map gt -js plugins.snow.take('incident')
au LocationChange example.service-now.com/u_request_fulfillment.do :map gt -js plugins.snow.take('u_request_fulfillment')

au LocationChange example.service-now.com/task_list.do :map j -js plugins.snow.cursor(1)
au LocationChange example.service-now.com/task_list.do :map k -js plugins.snow.cursor(-1)
au LocationChange example.service-now.com/task_list.do :map <CR> -js plugins.snow.open()
```
