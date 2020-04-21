package cz.mzk.fofola.processes.core.services;

import cz.mzk.fofola.processes.core.commands.*;
import cz.mzk.fofola.processes.core.constants.ProcessType;
import cz.mzk.fofola.processes.core.models.Process;
import org.axonframework.commandhandling.gateway.CommandGateway;
import org.axonframework.eventhandling.gateway.EventGateway;
import org.springframework.stereotype.Service;

import java.lang.reflect.Constructor;
import java.lang.reflect.InvocationTargetException;
import java.util.Map;
import java.util.UUID;
import java.util.concurrent.CompletableFuture;
import java.util.logging.Logger;

@Service
public class ProcessCommandService {

    private final CommandGateway commandGateway;
    private final EventGateway eventGateway;
    private final ProcessManagementService processManagementService;
    private static final Logger logger = Logger.getLogger(ProcessCommandService.class.getName());

    public ProcessCommandService(CommandGateway commandGateway,
                                 EventGateway eventGateway,
                                 ProcessManagementService processManagementService) {
        this.commandGateway = commandGateway;
        this.eventGateway = eventGateway;
        this.processManagementService = processManagementService;
    }

    public String startNewProcess(ProcessType type, Map<String, Object> params)
            throws InvocationTargetException, NoSuchMethodException, InstantiationException, IllegalAccessException {
        String processId = UUID.randomUUID().toString();
        params.put("processId", processId);
        params.put("eventGateway", eventGateway);
        Process process = instantiate(type, params);
        commandGateway.send(new StartProcessCommand(processId, type, process));
        processManagementService.run(processId, process);
        return processId;
    }

    public CompletableFuture<Process> suspendRunningProcess(String processId) {
        CompletableFuture<Process> result = commandGateway.send(new SuspendProcessCommand(processId));
        processManagementService.suspend(processId);
        return result;
    }

    public CompletableFuture<Process> activateSuspendedProcess(String processId) {
        CompletableFuture<Process> result = commandGateway.send(new ActivateProcessCommand(processId));
        processManagementService.activate(processId);
        return result;
    }

    public CompletableFuture<Process> terminateProcess(String processId) {
        CompletableFuture<Process> result = commandGateway.send(new TerminateProcessCommand(processId));
        processManagementService.terminate(processId);
        return result;
    }

    public static Process instantiate(ProcessType type, Map<String, Object> params)
            throws NoSuchMethodException, IllegalAccessException,
            InvocationTargetException, InstantiationException {
        Class processClass = type.getProcessClass();
        if (processClass == null)
            throw new IllegalStateException("No defined process class for type \"" + type.toString() + "\"!");
        Constructor<?> ctor = processClass.getConstructor(params.getClass());
        Object object = ctor.newInstance(params);
        return (Process) object;
    }

    public CompletableFuture<Process> removeInfoFromDB(String processId) {
        return commandGateway.send(new RemoveInfoCommand(processId));
    }
}
