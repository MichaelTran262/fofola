import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom'
import {Home} from "./Home";
import {Reindex} from "../features/reindex/Reindex";
import {Delete} from "../features/delete/Delete";
import {ChangeAccess} from "../features/change-access/ChangeAccess";
import {LinkDonator} from "../features/link-donator/LinkDonator";
import {LinkVc} from "../features/link-vc/LinkVc";
import {UuidInfo} from "../features/uuid-info/UuidInfo";
import {KrameriusProcesses} from "../features/kramerius-procesess/KrameriusProcesses";
import {CheckDonator} from "../features/check-donator/CheckDonator";
import {InternalProcesses} from "../features/internal-processes/InternalProcesses";
import {Pdf} from "../features/pdf/Pdf";

export const App = () => (
    <BrowserRouter>
        <Route exact path='/' component={Home} />
        <Route path='/uuid-info' component={UuidInfo} />
        <Route path='/access' component={ChangeAccess} />
        <Route path='/reindex' component={Reindex} />
        <Route path='/delete' component={Delete} />
        <Route path='/link-vc' component={LinkVc} />
        <Route path='/link-donator' component={LinkDonator} />
        <Route path='/kramerius-processes' component={KrameriusProcesses} />
        <Route path='/check-donator' component={CheckDonator} />
        <Route path='/internal-processes' cpmponent={InternalProcesses} />
        <Route path="/pdf" component={Pdf} />
    </BrowserRouter>
);
